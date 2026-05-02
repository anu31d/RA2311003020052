import { Request, Response, NextFunction } from 'express';
import { getLogger } from '../../logging_middleware';

const logger = getLogger();

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction): void {
  logger.error('Request Error', {
    method: req.method,
    path: req.path,
    statusCode: err.statusCode || 500,
    message: err.message,
  });

  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
    statusCode: err.statusCode || 500,
  });
}
