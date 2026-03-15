import pino from 'pino';

export const logger =  pino({
    transport: {
    target: 'pino-pretty'
  },
});

export const logError = (err, req, res, next) => {
   logger.error(err)
   next(err)
}