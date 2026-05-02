import { QueryParams } from '../types';
import { ValidationError } from './errors';

export function validateQueryParams(params: QueryParams): void {
  if (params.limit !== undefined) {
    if (!Number.isInteger(params.limit) || params.limit < 1) {
      throw new ValidationError(400, 'limit must be a positive integer');
    }
    if (params.limit > 100) {
      throw new ValidationError(400, 'limit cannot exceed 100');
    }
  }

  if (params.page !== undefined) {
    if (!Number.isInteger(params.page) || params.page < 1) {
      throw new ValidationError(400, 'page must be a positive integer');
    }
  }

  if (params.notification_type !== undefined) {
    const validTypes = ['Event', 'Result', 'Placement'];
    if (!validTypes.includes(params.notification_type)) {
      throw new ValidationError(400, `notification_type must be one of: ${validTypes.join(', ')}`);
    }
  }
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}
