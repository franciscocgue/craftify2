import { Queue } from "bullmq";
import { QUEUE_NAMES, redisConnection } from "../config";

// define queue for app builds
export const myQueue = new Queue(QUEUE_NAMES.appBuilder, { connection: redisConnection });