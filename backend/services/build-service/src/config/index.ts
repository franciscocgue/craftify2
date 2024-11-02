import Redis from "ioredis";

export const QUEUE_NAMES = {
    appBuilder: 'queue-app-builder'
}

// Redis connection
export const redisConnection = new Redis({
    host: 'localhost', // Redis server address
    port: 6379,        // Redis server port
    maxRetriesPerRequest: null,
});