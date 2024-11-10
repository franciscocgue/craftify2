import { Router } from "express";
import { presignedUrl, putObject } from "../controllers/s3Controller";

const router = Router();

// add object to bucket
router.post('/putObject', putObject);

// get pre-signed object url
router.post('/presignedUrl', presignedUrl);

export default router;