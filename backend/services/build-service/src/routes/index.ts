import express from 'express';
import { appBuildController } from '../controllers';

const router = express.Router();

router.post('/build', appBuildController);

export default router;