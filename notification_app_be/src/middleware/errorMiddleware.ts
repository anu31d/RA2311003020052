import { Request, Response, NextFunction } from 'express';
import { getLogger } from '../utils/logger';

const logger = getLogger();

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction): void {
  logger.error('Request Error', {
    method: req.method,
    path: req.path,
    statusCode: err.statusCode || 500,
    message: err.message,
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    message,
    statusCode,
  });
}
