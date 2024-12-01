import express, { Express, Request } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { dbConnect, getClient } from './db';
import { buildLogger } from './utils/logger';
const bodyParser = require("body-parser");

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json({ limit: '10mb' }))

// initialize MongoDB client
dbConnect();

app.get('/health', (_, res) => {
    const data = {
        service: 'db-service',
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date()
    }
    res.status(200).send(data);
});

// ROUTES

const logger = buildLogger('db-service');

type RequestBodyRead = {
    collectionName: string,
    columns: Record<string, 0 | 1>,
    filter?: Record<string, any>,
}

app.post('/api/db-service/read', async (req: Request<{}, {}, RequestBodyRead>, res) => {

    try {
        const client = getClient();

        const collectionName = req.body.collectionName;

        const database = await client.db('craftify');
        const collection = database.collection(collectionName);
        // const cursor = collections[0].find({});

        const options = {
            // sort matched documents in descending order by rating
            // sort: { "imdb.rating": -1 },
            // Include only the `title` and `imdb` fields in the returned document
            projection: req.body.columns,
        };
        const filter = req.body.filter ?? {};
        const cursor = await collection.find(filter, options);

        const result = [];
        for await (const doc of cursor) {
            result.push(doc);
        };
        // console.log(item)

        res.status(200).json({
            status: 'ok',
            data: result,
        });
    } catch (error) {
        logger.error(`${error}`);
        res.status(500).json({
            status: 'nok',
            message: '[error] Could not retrieve data',
        });
    }
});

type RequestBodyCreate = {
    collectionName: string,
    documents: [Record<string, any>, ...Record<string, any>[]]
}

app.post('/api/db-service/create', async (req: Request<{}, {}, RequestBodyCreate>, res) => {

    try {
        const client = getClient();

        const collectionName = req.body.collectionName;

        const database = await client.db('craftify');
        const collection = database.collection(collectionName);

        const { insertedIds } = await collection.insertMany(req.body.documents);

        res.status(200).json({
            status: 'ok',
            data: insertedIds,
        });
    } catch (error) {
        logger.error(`${error}`);
        res.status(500).json({
            status: 'nok',
            message: '[error] Could not create data',
        });
    }
});

type RequestBodyDelete = {
    collectionName: string,
    filter: Record<string, any>,
}

app.post('/api/db-service/delete', async (req: Request<{}, {}, RequestBodyDelete>, res) => {

    try {
        const client = getClient();

        const collectionName = req.body.collectionName;

        const database = await client.db('craftify');
        const collection = database.collection(collectionName);

        await collection.deleteMany(req.body.filter);

        res.status(200).json({
            status: 'ok',
            data: null,
        });
    } catch (error) {
        logger.error(`${error}`);
        res.status(500).json({
            status: 'nok',
            message: '[error] Could not delete item(s)',
        });
    }
});

type RequestBodyUpdate = {
    collectionName: string,
    filter: Record<string, any>,
    changes: Record<string, any>,
}

app.post('/api/db-service/update', async (req: Request<{}, {}, RequestBodyUpdate>, res) => {

    try {
        const client = getClient();

        const collectionName = req.body.collectionName;

        const database = await client.db('craftify');
        const collection = database.collection(collectionName);

        const filter = req.body.filter;
        const options = { upsert: false };
        const updateDoc = {
            $set: req.body.changes,
        };

        await collection.updateMany(filter, updateDoc, options);

        res.status(200).json({
            status: 'ok',
            data: null,
        });
    } catch (error) {
        logger.error(`${error}`);
        res.status(500).json({
            status: 'nok',
            message: '[error] Could not update item(s)',
        });
    }
});

app.listen(port, () => {
    console.log(`[db-service]: Server is running at http://localhost:${port} (${process.env.NODE_ENV})`);
});