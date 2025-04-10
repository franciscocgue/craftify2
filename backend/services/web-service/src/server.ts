import express, { Express, Response, Request } from "express";
import path from "path";
const dotenv = require('dotenv');
dotenv.config();
import routes from './routes';
import bodyParser from "body-parser";
import cors from 'cors';
import { authentication } from "./middlewares";
import jwt from 'jsonwebtoken';
import { Resend } from "resend";
import { emailHtml } from "./views/magic-link-email";
import { magicLoginDummyHtml } from "./views/magic-login";
const cookieParser = require('cookie-parser');


const app: Express = express();
const port = process.env.PORT;
const host = process.env.BACKEND_HOST;

app.use(cors({
    // probably only needed during development
    origin: process.env.FRONTEND_URL // React app's URL,
}));

// @TODO: estimate actual limits
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cookieParser());

app.get('/health', (_, res) => {
    const data = {
        service: 'web-service',
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date()
    }
    res.status(200).send(data);
});

app.get('/logout', (req, res) => {
    res.cookie("session", "", {
        httpOnly: true,
        secure: true, // Required for SameSite=None cookies
        sameSite: "lax",
        expires: new Date(0), // Expire immediately
        path: "/", // Must match the original path
    });
    res.json({ success: true });
})


app.get('/magic-login', (req, res) => {
    /**
     * res.cookies will set cookies for SUBSEQUENT requests.
     * So a redirect after setting cookies will not find the cookies yet.
     * Therefore this magic-login page makes this first "subsequent" 
     * request where cookies should already be in place.
    */
    res.send(magicLoginDummyHtml());
});

// request access
app.post<{}, {}, { email: string }>('/api/request-access', (req, res, next) => {

    const { email } = req.body;
    const token = jwt.sign({ email }, process.env.SECRET_REQUEST_ACCESS_TOKEN as string, { expiresIn: '20m' })
    const authUrl = `${host}:${port}/magic-login?token=${token}`


    const resend = new Resend(process.env.EMAIL_API_KEY);

    resend.emails.send({
        from: 'craftify@resend.dev',
        to: 'franciscocguerrero@gmail.com',
        subject: 'Craftify Login',
        html: emailHtml(authUrl)
    });


    res.send({ success: true, authUrl })
})

// magic login
app.get<{ token: string }>('/api/magic-login/:token', (req, res, next) => {

    try {
        const { token } = req.params;
        const email = (jwt.verify(token, process.env.SECRET_REQUEST_ACCESS_TOKEN as string) as { email: string }).email;

        // @TODO: store user credentials?
        // const user = { email };

        const tokenLoggedIn = jwt.sign({ email }, process.env.SECRET_LOGGED_IN_TOKEN as string, { expiresIn: '7d' })

        // Send HTTP-only cookie
        res.cookie("session", tokenLoggedIn, {
            httpOnly: true,    // JavaScript cannot access it
            secure: true,      // Send only over HTTPS
            // sameSite: "strict",   // Prevent CSRF
            sameSite: "lax",  // Allows cross-origin requests from different ports
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // res.redirect('/')
        res.send({ success: true })
        // res.json({ success: true });

        return

    } catch (err) {
        // res.redirect('/login')
        res.send({ success: false })
    }

    res.send({ success: true })
})

// @TODO: eventually extend this globally for it to be available everywhere
interface CustomRequest extends Request {
    userEmail?: string;
}
// API endpoint to send userEmail
app.get('/api/user', authentication, (req: CustomRequest, res) => {
    res.json({ userEmail: req.userEmail });
});

app.get('/', authentication, (req, res) => {
    res.sendFile(path.join(__dirname, '../../../../frontend/dist/index.html'))
})


app.use('/api/web-service', authentication, routes);

app.use(express.static(path.join(__dirname, '../../../../frontend/dist')));

if (process.env.NODE_ENV === 'development') {
    // preview of user-app (in development only)
    app.use(express.static(path.join(__dirname, '../../../user-app/dist/development')));
    app.get('/preview-dev', (req, res) => {
        res.sendFile(path.join(__dirname, '../../../user-app/dist/development', 'index.html'))
    })
}



app.get('*', authentication, (req, res) => {
    res.sendFile(path.join(__dirname, '../../../../frontend/dist/index.html'))
    // res.send(`
    //     <div style="display: flex; align-items: center; align-content: center; flex-direction: column;">
    //         <h1>404 - Not Found</h1>
    //         <p style="color: grey;">Oops! The page you are looking for does not exists.</p>
    //         <p>Open <a style="text-decoration: solid; font-weight: bold;" href="${host}:${port}">Craftify</a></p>
    //     </div>
    // `);
})

app.listen(port, () => {
    console.log(`[web-service]: Server is running at ${host}:${port} (${process.env.NODE_ENV})`);
});