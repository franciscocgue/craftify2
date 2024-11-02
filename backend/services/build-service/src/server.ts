import express, { Express, Request, Response } from "express";
import path from "path";
import routes from './routes';
import Redis from "ioredis";
import { authentication } from "./middlewares";
import { QueueEvents, Queue, Worker } from 'bullmq';
import './workers';
const dotenv = require('dotenv');
import { redisConnection, QUEUE_NAMES } from "./config";

dotenv.config();

// Redis connection
const connection = new Redis({
    host: 'localhost', // Redis server address
    port: 6379,        // Redis server port
    maxRetriesPerRequest: null,
});

const app: Express = express();
const port = process.env.PORT;

app.get('/health', (req, res) => {
    const data = {
        service: 'build-service',
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date()
    }
    res.status(200).send(data);
});


app.use('/api/build-service', authentication, routes);

// define queue for app builds

const myQueue = new Queue(QUEUE_NAMES.appBuilder, { connection: redisConnection });
myQueue.add('new-build', { color: 'azul verdoso' });


// async function addJobs() {
//   await myQueue.add('myJobName', { foo: 'bar' });
//   await myQueue.add('myJobName', { qux: 'baz' });
// }

// await addJobs();

// const queue = new Queue('app-builder', { connection: redisConnection });
// queue.add('cars', { color: 'blue' });
// const worker = new Worker('app-builder', async job => {
//     if (job.name === 'cars') {
//         await console.log(job.data.color);
//         // return 'abcd';
//     }
// }, { connection: redisConnection });

// const queueEvents = new QueueEvents('Paint');
// queueEvents.on('completed', ({ jobId }) => {
//     console.log('done painting', jobId);
// });
// queueEvents.on(
//     'failed',
//     ({ jobId, failedReason }: { jobId: string; failedReason: string }) => {
//         console.error('error painting', failedReason);
//     },
// );

// app.get('*', (req, res) => {
//     res.send(path.join(__dirname, '../../../../frontend/dist', 'index.html'))
// })

app.listen(port, () => {
    console.log(`[build-service]: Server is running at http://localhost:${port} (${process.env.NODE_ENV})`);
});