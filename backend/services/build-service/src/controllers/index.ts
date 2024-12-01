import { Request, Response } from "express";
import { myQueue } from "../queues/queue";
import { buildLogger } from "../utils/logger";

const logger = buildLogger('build-service');

export const appBuildController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        // Add job to queue
        await myQueue.add('new-build', data);

        res.status(201).json({ message: 'Build job added to queue' });
    } catch (error) {
        if (error instanceof Error) {
            // console.error(error.message); // Safely access the message property
            logger.error(error.message),
            res.status(500).json({ message: error.message });
        } else {
            logger.error('[error] build job could not be added to the queue'),
            res.status(500).json({ message: '[error] build job could not be added to the queue' });
        }
    }
}