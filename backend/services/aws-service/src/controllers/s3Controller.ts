import { Request, Response, NextFunction } from "express";
import { presignedUrlService, putObjectService } from '../services/s3Service';
import { NoSuchBucket } from "@aws-sdk/client-s3";
import { buildLogger } from '../../../../common-utils/logger';

const logger = buildLogger('aws-service');

type ObjectProps = {
    bucketName: string,
    key: string,
    body: any,
}

type RequestBody = {
    "app-id": string,
    objects: [ObjectProps, ...ObjectProps[]]
}

const putObject = async (req: Request<{}, {}, RequestBody>, res: Response, next: NextFunction) => {

    if (req.body.objects === undefined || req.body.objects.length === 0) {
        res.status(204).end();
    } else {

        try {
            for (const obj of req.body.objects) {
                await putObjectService({
                    bucketName: obj.bucketName,
                    key: obj.key,
                    body: obj.body
                });
                logger.log(`Put object '${obj.key}' successfull - bucket '${obj.bucketName}'`);
                res.status(204).end();
            }
        } catch (error) {
            if (error instanceof NoSuchBucket) {
                logger.error(`${error.name}: ${error.message}`);
            } else {
                logger.error(`${error}`);
            }
            res.status(500).json({
                message: '[error] Could not upload object to S3 bucket',
            });
        }
    }
};

const presignedUrl = async (req: Request<{}, {}, Pick<ObjectProps, 'bucketName' | 'key'>[]>, res: Response, next: NextFunction) => {
    const urls: Record<string, string> = {};
    try {
        for (const obj of req.body) {
            const url = await presignedUrlService({
                bucketName: obj.bucketName,
                key: obj.key,
            });
            urls[obj.key] = url;
        }

        res.status(200).json(urls);
    } catch (error) {
        logger.error(`${error}`);
        res.status(500).json({
            message: '[error] Could not get a pre-signed URL',
        });
    }
}


export {
    putObject,
    presignedUrl,
}