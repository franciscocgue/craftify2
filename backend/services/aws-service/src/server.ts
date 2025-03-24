import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import routes from "./routes";
const bodyParser = require("body-parser");

// const routes = require('./routes');


const app = express();
const port = process.env.PORT || 3002;
const host = process.env.BACKEND_HOST;

app.use(bodyParser.json({limit: '10mb'}))

app.get('/health', (_, res) => {
    const data = {
        service: 'aws-service',
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date()
    };
    res.status(200).send(data);
})

app.use('/api/aws-service', routes);

app.listen(port, () => {
    console.log(`[aws-service]: Server is running at ${host}:${port} (${process.env.NODE_ENV})`);
});