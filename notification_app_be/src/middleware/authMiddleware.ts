import { Request, Response, NextFunction } from 'express';
import authService from '../services/authService';

export interface AuthenticatedRequest extends Request {
  token?: string;
}

export async function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = await authService.getToken();
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Authentication failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
