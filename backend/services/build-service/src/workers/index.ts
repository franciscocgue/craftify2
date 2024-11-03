import { Worker } from 'bullmq';
import { QUEUE_NAMES, redisConnection } from '../config';
import { buildLogger } from './../../../../common-utils/logger';

const logger = buildLogger('build-service');

const worker = new Worker(QUEUE_NAMES.appBuilder, async job => {
    console.log(job.data);
}, { connection: redisConnection });

worker.on('completed', job => {
    // console.log(`${job.id} has completed!`);
    logger.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    console.error(`${job?.id} has failed with ${err.message}`);
});