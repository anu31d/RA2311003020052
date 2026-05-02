import { Request, Response, NextFunction } from 'express';
import authService from '../services/authService';
import { AuthenticationError } from '../utils/errors';

export interface AuthenticatedRequest extends Request {
  token?: string;
}

export async function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = await authService.getToken();
    req.token = token;
    next();
  } catch (error) {
    const authError = new AuthenticationError();
    res.status(authError.statusCode).json({
      message: authError.message,
      statusCode: authError.statusCode,
    });
  }
}
