import { LogLevel, LogEntry, LoggerConfig } from './types';

class Logger {
  private level: string;
  private format: 'json' | 'text';

  private readonly LOG_LEVELS: LogLevel = {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
  };

  private readonly LEVEL_PRIORITY: Record<string, number> = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
  };

  constructor(config: LoggerConfig = {}) {
    this.level = config.level || 'INFO';
    this.format = config.format || 'json';
  }

  private shouldLog(level: string): boolean {
    return this.LEVEL_PRIORITY[level] >= this.LEVEL_PRIORITY[this.level];
  }

  private formatLog(entry: LogEntry): string {
    if (this.format === 'json') {
      return JSON.stringify(entry);
    }
    return `[${entry.timestamp}] ${entry.level}: ${entry.message}${entry.meta ? ' ' + JSON.stringify(entry.meta) : ''}`;
  }

  private createLogEntry(level: string, message: string, meta?: Record<string, any>): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      meta,
    };
  }

  debug(message: string, meta?: Record<string, any>): void {
    if (this.shouldLog(this.LOG_LEVELS.DEBUG)) {
      const entry = this.createLogEntry(this.LOG_LEVELS.DEBUG, message, meta);
      console.log(this.formatLog(entry));
    }
  }

  info(message: string, meta?: Record<string, any>): void {
    if (this.shouldLog(this.LOG_LEVELS.INFO)) {
      const entry = this.createLogEntry(this.LOG_LEVELS.INFO, message, meta);
      console.log(this.formatLog(entry));
    }
  }

  warn(message: string, meta?: Record<string, any>): void {
    if (this.shouldLog(this.LOG_LEVELS.WARN)) {
      const entry = this.createLogEntry(this.LOG_LEVELS.WARN, message, meta);
      console.warn(this.formatLog(entry));
    }
  }

  error(message: string, meta?: Record<string, any>): void {
    if (this.shouldLog(this.LOG_LEVELS.ERROR)) {
      const entry = this.createLogEntry(this.LOG_LEVELS.ERROR, message, meta);
      console.error(this.formatLog(entry));
    }
  }

  setLevel(level: string): void {
    if (this.LEVEL_PRIORITY.hasOwnProperty(level)) {
      this.level = level;
    }
  }

  setFormat(format: 'json' | 'text'): void {
    this.format = format;
  }
}

export default Logger;
