import { Response, Request } from 'express';
import { httpClient } from '../utils/http-client';
import { addClient, clients, removeClient } from '../server-events';

const builder = async (req: Request, res: Response) => {
  try {
    // call build service
    const data = await httpClient.post<{ message: string }>('http://localhost:3001/api/build-service/build', req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Error occurred when starting to build the app',
      code: 500,
    });
  }
};

const getProjects = async (req: Request, res: Response) => {
  try {
    const body = {
      "collectionName": "projects",
      "columns": { "_id": 1, "appId": 1, "name": 1, "createdOn": 1, "editedOn": 1 }
    };

    const data = await httpClient.post<{ status: 'ok' | 'nok', data: unknown[] }>('http://localhost:3003/api/db-service/read', body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Error occurred when retrieving the projects',
      code: 500,
    });
  }
};

// checks if appId exists
const validateAppId = async (req: Request<{}, {}, { appId: string }>, res: Response) => {
  try {
    const body = {
      collectionName: "projects",
      columns: { "appId": 1 },
      filter: { appId: req.body.appId }
    };

    const data = await httpClient.post<{ status: 'ok' | 'nok', data: unknown[] }>('http://localhost:3003/api/db-service/read', body);
    if (data.data.length === 0) {
      res.status(200).json({
        status: 'ok',
        data: { isValid: false }
      });
    } else {
      res.status(200).json({
        status: 'ok',
        data: { isValid: true }
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Error occurred when retrieving the projects',
      code: 500,
    });
  }
};

type ProjectObjectType = 'components' | 'variables' | 'properties' | 'logicNodes' | 'logicEdges';
// get JSON from S3 bucket
const getProjectObject = async (req: Request<{}, {}, { appId: string, objectName: ProjectObjectType }>, res: Response) => {
  try {
    const body = {
      'bucketName': 'craftify-app-previews',
      'key': `${req.body.appId}/build-resources/${req.body.objectName}.json`,
    };
    const stringifiedObject = await httpClient.post
      <string, { bucketName: string, key: string }>
      ('http://localhost:3002/api/aws-service/s3/getObject', body);

    res.status(200).json(stringifiedObject);
  } catch (error) {
    res.status(500).json({
      error: 'Error occurred when retrieving the project data',
      code: 500,
    });
  }
}

const addProject = async (req: Request<{}, {}, { projectName: string }>, res: Response) => {
  try {
    const body = {
      "collectionName": "projects",
      "documents": [{ "appId": crypto.randomUUID(), "name": req.body.projectName, "createdOn": new Date(), "editedOn": new Date() }]
    };

    const data = await httpClient.post<{ status: 'ok' | 'nok', data: unknown[] }>('http://localhost:3003/api/db-service/create', body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Error occurred when creating new project',
      code: 500,
    });
  }
};

const deleteProject = async (req: Request<{}, {}, { appId: string }>, res: Response) => {
  try {
    const body = {
      "collectionName": "projects",
      "filter": { "appId": req.body.appId }
    };

    const data = await httpClient.post<{ status: 'ok' | 'nok', data?: unknown[], message?: string }>('http://localhost:3003/api/db-service/delete', body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Error occurred when deleting the project',
      code: 500,
    });
  }
};


const serverEvents = (req: Request<{ clientId: string }>, res: Response) => {
  // manage new connection / closing of connnections.

  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const clientId = req.params.clientId;
  console.log('serverEventsController', clientId)

  // add client (id is app id)
  addClient(res, clientId);

  // remove client if connection closes
  req.on('close', () => {
    removeClient(clientId);
  });

  // specific return format
  const data = { error: null };
  res.write(`data: ${JSON.stringify(data)}\n\n`);
  // res.write(`data: ${JSON.stringify({ clientId })}\n\n`);
};


const clientMessenger = (req: Request<{}, {}, { clientId: string, data: unknown }>, res: Response) => {

  // sends message to client;
  // use case: notify client with user-app url after build-service done

  const clientId = req.body.clientId;
  console.log('clientMessengerController', clientId)
  const data = req.body.data;

  if (clientId in clients) {
    clients[clientId].write(`data: ${JSON.stringify(data)}\n\n`);
    res.end();
  } else {
    res.status(404).send('Client not found.');
  }

  // res.end();
};

export {
  builder,
  serverEvents,
  clientMessenger,
  getProjects,
  addProject,
  deleteProject,
  getProjectObject,
  validateAppId,
};