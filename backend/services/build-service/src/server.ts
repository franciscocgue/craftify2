import express, { Express } from "express";
// import path from "path";
import routes from './routes';
import Redis from "ioredis";
// import { authentication } from "./middlewares";
import { Queue } from 'bullmq';
import './queues/worker'; // get workers running
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Use JSON body parser middleware
// app.use(express.json());
// parse application/json
// @TODO: estimate actual limits
app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.json())

app.get('/health', (req, res) => {
    const data = {
        service: 'build-service',
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date()
    }
    res.status(200).send(data);
});

// app.use('/api/build-service', authentication, routes);
app.use('/api/build-service', routes);


app.listen(port, () => {
    console.log(`[build-service]: Server is running at http://localhost:${port} (${process.env.NODE_ENV})`);
});