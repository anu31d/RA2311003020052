import { LoggerConfig } from './types';
declare class Logger {
    private level;
    private format;
    private readonly LOG_LEVELS;
    private readonly LEVEL_PRIORITY;
    constructor(config?: LoggerConfig);
    private shouldLog;
    private formatLog;
    private createLogEntry;
    debug(message: string, meta?: Record<string, any>): void;
    info(message: string, meta?: Record<string, any>): void;
    warn(message: string, meta?: Record<string, any>): void;
    error(message: string, meta?: Record<string, any>): void;
    setLevel(level: string): void;
    setFormat(format: 'json' | 'text'): void;
}
export default Logger;
//# sourceMappingURL=logger.d.ts.map