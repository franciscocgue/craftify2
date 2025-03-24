import express, { Express } from "express";
import path from "path";
const dotenv = require('dotenv');
dotenv.config();
import routes from './routes';
import bodyParser from "body-parser";
import cors from 'cors';


const app: Express = express();
const port = process.env.PORT;
const host = process.env.BACKEND_HOST;

app.use(cors({
    // probably only needed during development
    origin: 'http://localhost:5173' // React app's URL,
}));

// @TODO: estimate actual limits
app.use(bodyParser.json({ limit: '10mb' }));

app.get('/health', (_, res) => {
    const data = {
        service: 'web-service',
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date()
    }
    res.status(200).send(data);
});

app.use(express.static(path.join(__dirname, '../../../../frontend/dist')));

if (process.env.NODE_ENV === 'development') {
    // preview of user-app (in development only)
    app.use(express.static(path.join(__dirname, '../../../user-app/dist/development')));
    app.get('/preview-dev', (req, res) => {
        res.sendFile(path.join(__dirname, '../../../user-app/dist/development', 'index.html'))
    })
}

app.use('/api/web-service', routes);

app.get('*', (req, res) => {
    // res.send('<h2>Oops, error!</h2><p>It seems the requested page does not exist.</p>');
    res.sendFile(path.join(__dirname, '../../../../frontend/dist/index.html'))
})

app.listen(port, () => {
    console.log(`[web-service]: Server is running at ${host}:${port} (${process.env.NODE_ENV})`);
});