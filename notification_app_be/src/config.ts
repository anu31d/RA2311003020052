import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'INFO',

  // Credentials
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  email: process.env.EMAIL,
  name: process.env.NAME,
  rollNo: process.env.ROLL_NO,
  accessCode: process.env.ACCESS_CODE,

  // API URLs
  authApiUrl: process.env.AUTH_API_URL,
  notificationsApiUrl: process.env.NOTIFICATIONS_API_URL,
};

export function validateConfig(): void {
  const required = [
    'clientId',
    'clientSecret',
    'email',
    'name',
    'rollNo',
    'accessCode',
    'authApiUrl',
    'notificationsApiUrl',
  ];

  const missing = required.filter((key) => !config[key as keyof typeof config]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
