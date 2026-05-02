import axios from 'axios';
import { NotificationsResponse, FetchOptions, ApiError } from './types';
import { API_BASE_URL, ENDPOINTS } from './constants';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export async function fetchNotifications(options: FetchOptions = {}): Promise<NotificationsResponse> {
  try {
    const params: Record<string, any> = {};
    if (options.limit) params.limit = Math.min(options.limit, 100);
    if (options.page) params.page = Math.max(options.page, 1);
    if (options.notification_type) params.notification_type = options.notification_type;

    const response = await apiClient.get<NotificationsResponse>(ENDPOINTS.NOTIFICATIONS, {
      params,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw {
          message: 'Request timeout. Please try again.',
          statusCode: 408,
        } as ApiError;
      }
      throw {
        message: error.response?.data?.message || error.message,
        statusCode: error.response?.status || 500,
      } as ApiError;
    }
    throw {
      message: error instanceof Error ? error.message : 'Failed to fetch notifications',
      statusCode: 500,
    } as ApiError;
  }
}

export async function fetchNotificationsByType(
  type: 'Event' | 'Result' | 'Placement',
  options: Omit<FetchOptions, 'notification_type'> = {}
): Promise<NotificationsResponse> {
  return fetchNotifications({
    ...options,
    notification_type: type,
  });
}
