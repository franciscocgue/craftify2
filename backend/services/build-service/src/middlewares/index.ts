import { NextFunction, Response, Request } from 'express';

const authentication = (req: Request, res: Response, next: NextFunction) => {
    // @TODO: authentication; maybe in common (?)
    // if blabla
    console.log('Authentication checked!')
    next();
}

export {
    authentication,
};