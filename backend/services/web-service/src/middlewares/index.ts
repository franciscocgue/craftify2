import { NextFunction, Response, Request } from 'express';
import { accessRequestHtml } from '../views/access-request';
import jwt from 'jsonwebtoken';

const port = process.env.PORT;
const host = process.env.BACKEND_HOST;

// @TODO: eventually extend this globally for it to be available everywhere
interface CustomRequest extends Request {
    userEmail?: string;
}

const authentication = (req: CustomRequest, res: Response, next: NextFunction) => {
    // @TODO: authentication; maybe in common (?)

    // @TODO: authenticaltion also in development mode
    // if (process.env.NODE_ENV === 'development') {
    //     next();
    //     return;
    // }

    // @TODO: logger for all requests (which url, when, etc.)



    const token = req?.cookies?.session;

    if (!token) {

        // @TODO @TOFIX
        // Authentication works in dev if frontend served from backend (port 3000);
        // But if using Vite (FE served on 5173 eg), it does not.
        // Fix it and remove code below
        if (process.env.NODE_ENV === 'development' && req.get('origin') === process.env.FRONTEND_URL) {
            req.userEmail = 'My-User-Email'
            next();
            return;
        }

        res.send(accessRequestHtml(`${host}:${port}`));
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_LOGGED_IN_TOKEN as string) as {email: string};
        // @TODO: save user info (email) ?
        req.userEmail = decoded.email;
        next();
    } catch (err) {
        // res.status(401).json({ message: "Invalid session" });
        // @TODO: include in HTML message: "The Link has expired, try again."
        // @TODO: add logger
        // console.log(JSON.stringify(err))
        res.send(accessRequestHtml(`${host}:${port}`));
        return;
    }
}

export {
    authentication,
};