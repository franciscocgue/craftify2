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
}


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
}


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
}

export {
  builder,
  serverEvents,
  clientMessenger,
};