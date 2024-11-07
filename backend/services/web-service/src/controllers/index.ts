import { NextFunction, Response, Request } from 'express';
import { httpClient } from '../../../../common-utils/http-client';

const appPreviewController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // call build service
        const {data} = await httpClient.post('http://localhost:3301/api/build-service/build', req.body);
        res.status(200).json(data);
      } catch (error) {
        res.status(500).end();
      }
}

export default appPreviewController;