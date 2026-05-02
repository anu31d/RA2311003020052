import Logger from './logger';
import { LoggerConfig } from './types';

let instance: Logger | null = null;

export function initLogger(config?: LoggerConfig): Logger {
  if (!instance) {
    instance = new Logger(config);
  }
  return instance;
}

export function getLogger(): Logger {
  if (!instance) {
    instance = new Logger();
  }
  return instance;
}

export function expressLoggingMiddleware() {
  const logger = getLogger();

  return (req: any, res: any, next: any) => {
    const startTime = Date.now();

    const originalSend = res.send;
    res.send = function (data: any) {
      const duration = Date.now() - startTime;
      logger.info(`${req.method} ${req.path}`, {
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        userAgent: req.get('user-agent'),
      });

      originalSend.call(this, data);
    };

    next();
  };
}

export function errorLoggingMiddleware() {
  const logger = getLogger();

  return (err: any, req: any, res: any, next: any) => {
    logger.error('Request Error', {
      method: req.method,
      path: req.path,
      statusCode: err.statusCode || 500,
      message: err.message,
      stack: err.stack,
    });

    next(err);
  };
}

export { Logger };
export * from './types';
