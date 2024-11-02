import { Worker } from 'bullmq';
import { QUEUE_NAMES, redisConnection } from '../config';

const worker = new Worker(QUEUE_NAMES.appBuilder, async job => {
    console.log(job.data);
}, { connection: redisConnection });

worker.on('completed', job => {
    console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    console.log(`${job?.id} has failed with ${err.message}`);
});