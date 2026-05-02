'use client';

import { useState, useEffect } from 'react';
import { Container, Box, CircularProgress, Alert, Typography } from '@mui/material';
import { fetchNotifications } from '@/lib/apiClient';
import NotificationCard from '@/components/NotificationCard';
import { Notification, ApiError, ViewedNotification } from '@/lib/types';
import { PRIORITY_LIMIT } from '@/lib/constants';

export default function PriorityPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [viewed, setViewed] = useState<ViewedNotification>({});

  useEffect(() => {
    const savedViewed = localStorage.getItem('viewedNotifications');
    if (savedViewed) {
      setViewed(JSON.parse(savedViewed));
    }
  }, []);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchNotifications({
          limit: PRIORITY_LIMIT,
          page: 1,
        });
        setNotifications(data.notifications.slice(0, PRIORITY_LIMIT));
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  const handleNotificationView = (id: string) => {
    const updated = { ...viewed, [id]: true };
    setViewed(updated);
    localStorage.setItem('viewedNotifications', JSON.stringify(updated));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: { xs: 2, sm: 4 } }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
          Priority Notifications (Top {PRIORITY_LIMIT})
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message}
          </Alert>
        )}
        {!loading && notifications.length > 0 && (
          <Box>
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.ID}
                notification={notification}
                isViewed={viewed[notification.ID] || false}
                onView={handleNotificationView}
              />
            ))}
          </Box>
        )}
        {!loading && notifications.length === 0 && !error && (
          <Alert severity="info">No notifications available</Alert>
        )}
      </Box>
    </Container>
  );
}
