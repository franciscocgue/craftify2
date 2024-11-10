import express, { Express } from "express";
import path from "path";
const dotenv = require('dotenv');
import routes from './routes';
import bodyParser from "body-parser";
const cors = require('cors');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors({
    // probably only needed during development
    origin: 'http://localhost:5173' // React app's URL
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
    res.send('<h2>Oops, error!</h2><p>It seems the requested page does not exist.</p>');
})

app.listen(port, () => {
    console.log(`[web-service]: Server is running at http://localhost:${port} (${process.env.NODE_ENV})`);
});