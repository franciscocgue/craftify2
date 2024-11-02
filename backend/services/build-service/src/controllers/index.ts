import { NextFunction, Request } from "express";

exports.appBuildController = async (req: Request, res: Response, next: NextFunction) => {
    const { data } = req.body;
}