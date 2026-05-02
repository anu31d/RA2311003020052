export interface LogLevel {
    DEBUG: string;
    INFO: string;
    WARN: string;
    ERROR: string;
}
export interface LogEntry {
    timestamp: string;
    level: string;
    message: string;
    meta?: Record<string, any>;
}
export interface LoggerConfig {
    level?: string;
    format?: 'json' | 'text';
}
//# sourceMappingURL=types.d.ts.map