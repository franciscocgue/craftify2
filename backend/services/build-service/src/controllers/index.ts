import { NextFunction, Request, Response } from "express";
import { myQueue } from "../queues/queue";

export const appBuildController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        // Add job to queue
        await myQueue.add('new-build', data);

        res.status(201).json({ message: 'Build job added to queue' });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message); // Safely access the message property
        } else {
            res.status(500).json({ message: '[error] bres.status(500).json({ message: error.msg });uild job could not be added to the queue' });
        }
    }
}