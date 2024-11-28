import express, { Express, Request } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const { MongoClient, ServerApiVersion } = require('mongodb');
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

type RequestBody = {
    databaseName: string,
    columns: Record<string, 0 | 1>
}

app.post('/api/db-service/list', async (req: Request<{}, {}, RequestBody>, res) => {

    try {
        const client = getClient();

        const databaseName = req.body.databaseName;

        const database = await client.db('craftify');
        const items = database.collection(databaseName);
        // const cursor = collections[0].find({});

        const options = {
            // sort matched documents in descending order by rating
            // sort: { "imdb.rating": -1 },
            // Include only the `title` and `imdb` fields in the returned document
            projection: req.body.columns,
        };
        const cursor = await items.find({}, options);

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

app.listen(port, () => {
    console.log(`[db-service]: Server is running at http://localhost:${port} (${process.env.NODE_ENV})`);
});