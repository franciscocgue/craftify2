import express, { Express, Request, Response } from "express";
import path from "path";
const dotenv = require('dotenv');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, '../../../../frontend/dist')));

app.get('/health', (req, res) => {
    const data = {
        service: 'web-service',
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date()
      }
    res.status(200).send(data);
});

app.get('*', (req, res) => {
    res.send(path.join(__dirname, '../../../../frontend/dist', 'index.html'))
})

app.listen(port, () => {
    console.log(`[web-service]: Server is running at http://localhost:${port} (${process.env.NODE_ENV})`);
});