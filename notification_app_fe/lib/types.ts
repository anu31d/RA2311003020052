export interface Notification {
  ID: string;
  Type: 'Event' | 'Result' | 'Placement';
  Message: string;
  Timestamp: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
}

export interface ViewedNotification {
  [key: string]: boolean;
}

export interface FetchOptions {
  limit?: number;
  page?: number;
  notification_type?: 'Event' | 'Result' | 'Placement';
}

export interface ApiError {
  message: string;
  statusCode: number;
}
