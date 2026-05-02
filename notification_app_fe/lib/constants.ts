export const NOTIFICATION_TYPES = ['Event', 'Result', 'Placement'] as const;

export const PRIORITY_LIMIT = 5;

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const ENDPOINTS = {
  NOTIFICATIONS: '/api/notifications',
};

export const NOTIFICATION_TYPE_COLORS: Record<string, string> = {
  Event: '#B3D9FF',
  Result: '#A8E6A8',
  Placement: '#FFD4A3',
};

export const DEFAULT_LIMIT = 10;

export const DEFAULT_PAGE = 1;
