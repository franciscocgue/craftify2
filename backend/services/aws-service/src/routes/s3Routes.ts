import { Router } from "express";
import { presignedUrl, putObject, getObject } from "../controllers/s3Controller";

const router = Router();

// add object to bucket
router.post('/putObject', putObject);
// read bucket object
router.post('/getObject', getObject);

// get pre-signed object url
router.post('/presignedUrl', presignedUrl);

export default router;