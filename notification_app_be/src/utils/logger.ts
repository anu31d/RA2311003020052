type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

class Logger {
  private logLevel: LogLevel = 'INFO';

  constructor(config?: { logLevel?: LogLevel }) {
    if (config?.logLevel) {
      this.logLevel = config.logLevel;
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      DEBUG: 0,
      INFO: 1,
      WARN: 2,
      ERROR: 3,
    };
    return levels[level] >= levels[this.logLevel];
  }

  debug(message: string, meta?: Record<string, any>): void {
    if (this.shouldLog('DEBUG')) {
      console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'DEBUG',
        message,
        ...meta,
      }));
    }
  }

  info(message: string, meta?: Record<string, any>): void {
    if (this.shouldLog('INFO')) {
      console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'INFO',
        message,
        ...meta,
      }));
    }
  }

  warn(message: string, meta?: Record<string, any>): void {
    if (this.shouldLog('WARN')) {
      console.warn(JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'WARN',
        message,
        ...meta,
      }));
    }
  }

  error(message: string, meta?: Record<string, any>): void {
    if (this.shouldLog('ERROR')) {
      console.error(JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'ERROR',
        message,
        ...meta,
      }));
    }
  }
}

let instance: Logger | null = null;

export function getLogger(): Logger {
  if (!instance) {
    instance = new Logger({
      logLevel: (process.env.LOG_LEVEL as LogLevel) || 'INFO',
    });
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
      });
      originalSend.call(this, data);
    };

    next();
  };
}

export default Logger;
