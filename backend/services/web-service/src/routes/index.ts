import express from "express";
import appPreviewController from "../controllers";

const router = express.Router();

router.post('/preview', appPreviewController);

export default router;