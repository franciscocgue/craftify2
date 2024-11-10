import express from "express";
import dotenv from 'dotenv';
import routes from "./routes";
const bodyParser = require("body-parser");

// const routes = require('./routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

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
    console.log(`[aws-service]: Server is running at http://localhost:${port} (${process.env.NODE_ENV})`);
});