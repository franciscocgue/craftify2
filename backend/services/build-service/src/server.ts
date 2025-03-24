import express, { Express } from "express";
const dotenv = require('dotenv');
dotenv.config();
// import path from "path";
import routes from './routes';
// import { authentication } from "./middlewares";
import './queues/worker'; // get workers running
const bodyParser = require('body-parser');


const app: Express = express();
const port = process.env.PORT;
const host = process.env.BACKEND_HOST;

// Use JSON body parser middleware
// app.use(express.json());
// parse application/json
// @TODO: estimate actual limits
app.use(bodyParser.json({limit: '10mb'}));
// app.use(bodyParser.json())

app.get('/health', (_, res) => {
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
    console.log(`[build-service]: Server is running at ${host}:${port} (${process.env.NODE_ENV})`);
});