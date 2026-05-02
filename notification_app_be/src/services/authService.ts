import axios from 'axios';
import { config } from '../config';
import { AuthResponse } from '../types';

class AuthService {
  private token: string | null = null;
  private tokenExpiry: number = 0;

  async getToken(): Promise<string> {
    if (this.token && Date.now() < this.tokenExpiry) {
      return this.token;
    }

    try {
      const response = await axios.post<AuthResponse>(config.authApiUrl!, {
        email: config.email,
        accessCode: config.accessCode,
        clientID: config.clientId,
        clientSecret: config.clientSecret,
      }, {
        timeout: 10000,
      });

      this.token = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);

      return this.token;
    } catch (error) {
      // Fallback to mock token in development
      if (config.nodeEnv === 'development') {
        console.log('Using mock token (Auth unavailable)');
        this.token = `mock_token_${Date.now()}`;
        this.tokenExpiry = Date.now() + (3600 * 1000); // 1 hour expiry
        return this.token;
      }
      throw new Error(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  clearToken(): void {
    this.token = null;
    this.tokenExpiry = 0;
  }
}

export default new AuthService();
