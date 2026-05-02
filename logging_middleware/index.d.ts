import Logger from './logger';
import { LoggerConfig } from './types';
export declare function initLogger(config?: LoggerConfig): Logger;
export declare function getLogger(): Logger;
export declare function expressLoggingMiddleware(): (req: any, res: any, next: any) => void;
export declare function errorLoggingMiddleware(): (err: any, req: any, res: any, next: any) => void;
export { Logger };
export * from './types';
//# sourceMappingURL=index.d.ts.map