import { Notification } from '../types';

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    ID: '1',
    Type: 'Event',
    Message: 'Important meeting scheduled for tomorrow at 2 PM',
    Timestamp: new Date(Date.now() - 1 * 60000).toISOString().replace('T', ' ').slice(0, 19),
  },
  {
    ID: '2',
    Type: 'Result',
    Message: 'Your exam results are now available in the portal',
    Timestamp: new Date(Date.now() - 2 * 60000).toISOString().replace('T', ' ').slice(0, 19),
  },
  {
    ID: '3',
    Type: 'Placement',
    Message: 'Amazon is visiting campus on May 15, 2026',
    Timestamp: new Date(Date.now() - 5 * 60000).toISOString().replace('T', ' ').slice(0, 19),
  },
  {
    ID: '4',
    Type: 'Event',
    Message: 'Seminar on Cloud Computing by industry experts',
    Timestamp: new Date(Date.now() - 10 * 60000).toISOString().replace('T', ' ').slice(0, 19),
  },
  {
    ID: '5',
    Type: 'Result',
    Message: 'Assignment 3 has been graded. Check your score now',
    Timestamp: new Date(Date.now() - 15 * 60000).toISOString().replace('T', ' ').slice(0, 19),
  },
  {
    ID: '6',
    Type: 'Placement',
    Message: 'Microsoft recruitment drive - Apply before May 10',
    Timestamp: new Date(Date.now() - 20 * 60000).toISOString().replace('T', ' ').slice(0, 19),
  },
  {
    ID: '7',
    Type: 'Event',
    Message: 'Workshop on Machine Learning and AI techniques',
    Timestamp: new Date(Date.now() - 30 * 60000).toISOString().replace('T', ' ').slice(0, 19),
  },
  {
    ID: '8',
    Type: 'Result',
    Message: 'Midterm exam results released',
    Timestamp: new Date(Date.now() - 40 * 60000).toISOString().replace('T', ' ').slice(0, 19),
  },
  {
    ID: '9',
    Type: 'Placement',
    Message: 'Google internship applications now open',
    Timestamp: new Date(Date.now() - 50 * 60000).toISOString().replace('T', ' ').slice(0, 19),
  },
  {
    ID: '10',
    Type: 'Event',
    Message: 'Campus tech festival starting next week',
    Timestamp: new Date(Date.now() - 60 * 60000).toISOString().replace('T', ' ').slice(0, 19),
  },
];

export function getMockNotifications(
  limit: number = 10,
  page: number = 1,
  notification_type?: string
): Notification[] {
  let filtered = MOCK_NOTIFICATIONS;

  if (notification_type) {
    filtered = filtered.filter(n => n.Type === notification_type);
  }

  const start = (page - 1) * limit;
  const end = start + limit;

  return filtered.slice(start, end);
}
