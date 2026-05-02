"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
exports.initLogger = initLogger;
exports.getLogger = getLogger;
exports.expressLoggingMiddleware = expressLoggingMiddleware;
exports.errorLoggingMiddleware = errorLoggingMiddleware;
const logger_1 = __importDefault(require("./logger"));
exports.Logger = logger_1.default;
let instance = null;
function initLogger(config) {
    if (!instance) {
        instance = new logger_1.default(config);
    }
    return instance;
}
function getLogger() {
    if (!instance) {
        instance = new logger_1.default();
    }
    return instance;
}
function expressLoggingMiddleware() {
    const logger = getLogger();
    return (req, res, next) => {
        const startTime = Date.now();
        const originalSend = res.send;
        res.send = function (data) {
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
function errorLoggingMiddleware() {
    const logger = getLogger();
    return (err, req, res, next) => {
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
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map