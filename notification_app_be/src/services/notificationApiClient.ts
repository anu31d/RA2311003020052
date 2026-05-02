import axios from 'axios';
import { config } from '../config';
import { NotificationsResponse, QueryParams } from '../types';
import authService from './authService';
import { getMockNotifications } from './mockData';
import { ApiError } from '../utils/errors';

class NotificationApiClient {
  async getNotifications(params: QueryParams): Promise<NotificationsResponse> {
    // Use mock data in debug mode
    if (process.env.DEBUG_MODE === 'true') {
      console.log('Using mock data (DEBUG_MODE enabled)');
      const mockData = getMockNotifications(
        params.limit || 10,
        params.page || 1,
        params.notification_type
      );
      return { notifications: mockData };
    }

    try {
      const token = await authService.getToken();

      const queryString = new URLSearchParams();
      if (params.limit) queryString.append('limit', params.limit.toString());
      if (params.page) queryString.append('page', params.page.toString());
      if (params.notification_type) queryString.append('notification_type', params.notification_type);

      const url = `${config.notificationsApiUrl}?${queryString.toString()}`;

      const response = await axios.get<NotificationsResponse>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
      });

      return response.data;
    } catch (error) {
      // Fallback to mock data in development
      if (config.nodeEnv === 'development') {
        console.log('Using mock data (API unavailable)');
        const mockData = getMockNotifications(
          params.limit || 10,
          params.page || 1,
          params.notification_type
        );
        return { notifications: mockData };
      }

      if (axios.isAxiosError(error)) {
        throw new ApiError(error.response?.status || 500, `API Error: ${error.message}`);
      }
      throw new ApiError(500, error instanceof Error ? error.message : 'Failed to fetch notifications');
    }
  }
}

export default new NotificationApiClient();
