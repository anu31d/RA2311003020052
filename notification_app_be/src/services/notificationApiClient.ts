import axios from 'axios';
import { config } from '../config';
import { NotificationsResponse, QueryParams } from '../types';
import authService from './authService';

class NotificationApiClient {
  async getNotifications(params: QueryParams): Promise<NotificationsResponse> {
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
      });

      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch notifications: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export default new NotificationApiClient();
