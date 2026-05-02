export interface Notification {
  ID: string;
  Type: 'Event' | 'Result' | 'Placement';
  Message: string;
  Timestamp: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
}

export interface QueryParams {
  limit?: number;
  page?: number;
  notification_type?: 'Event' | 'Result' | 'Placement';
}

export interface AuthResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
  details?: Record<string, any>;
}
