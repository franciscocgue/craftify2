import { Express, Router } from 'express';
import s3Routes from './s3Routes';

const router = Router();

router.use('/s3', s3Routes);

export default router;

// export default (app: Express) => {
//     app.use('/s3', s3Routes);
//     // add here other routes
// }