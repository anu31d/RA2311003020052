"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor(config = {}) {
        this.LOG_LEVELS = {
            DEBUG: 'DEBUG',
            INFO: 'INFO',
            WARN: 'WARN',
            ERROR: 'ERROR',
        };
        this.LEVEL_PRIORITY = {
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3,
        };
        this.level = config.level || 'INFO';
        this.format = config.format || 'json';
    }
    shouldLog(level) {
        return this.LEVEL_PRIORITY[level] >= this.LEVEL_PRIORITY[this.level];
    }
    formatLog(entry) {
        if (this.format === 'json') {
            return JSON.stringify(entry);
        }
        return `[${entry.timestamp}] ${entry.level}: ${entry.message}${entry.meta ? ' ' + JSON.stringify(entry.meta) : ''}`;
    }
    createLogEntry(level, message, meta) {
        return {
            timestamp: new Date().toISOString(),
            level,
            message,
            meta,
        };
    }
    debug(message, meta) {
        if (this.shouldLog(this.LOG_LEVELS.DEBUG)) {
            const entry = this.createLogEntry(this.LOG_LEVELS.DEBUG, message, meta);
            console.log(this.formatLog(entry));
        }
    }
    info(message, meta) {
        if (this.shouldLog(this.LOG_LEVELS.INFO)) {
            const entry = this.createLogEntry(this.LOG_LEVELS.INFO, message, meta);
            console.log(this.formatLog(entry));
        }
    }
    warn(message, meta) {
        if (this.shouldLog(this.LOG_LEVELS.WARN)) {
            const entry = this.createLogEntry(this.LOG_LEVELS.WARN, message, meta);
            console.warn(this.formatLog(entry));
        }
    }
    error(message, meta) {
        if (this.shouldLog(this.LOG_LEVELS.ERROR)) {
            const entry = this.createLogEntry(this.LOG_LEVELS.ERROR, message, meta);
            console.error(this.formatLog(entry));
        }
    }
    setLevel(level) {
        if (this.LEVEL_PRIORITY.hasOwnProperty(level)) {
            this.level = level;
        }
    }
    setFormat(format) {
        this.format = format;
    }
}
exports.default = Logger;
//# sourceMappingURL=logger.js.map