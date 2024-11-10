import winston from 'winston';
const {combine, timestamp, json} = winston.format;

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        json(),
    ),
    // defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or higher to `error.log`
        //   (i.e., error, fatal, but not other levels)
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        //
        // - Write all logs with importance level of `info` or higher to `combined.log`
        //   (i.e., fatal, error, warn, and info, but not trace)
        //
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export const buildLogger = (service: string) => {
    return {
        log: (message: string) => {
            logger.log({level: 'info', message, service })
        },
        error: (message: string) => {
            logger.error({level: 'error', message, service })
        },
    }
}

// export default buildLogger;