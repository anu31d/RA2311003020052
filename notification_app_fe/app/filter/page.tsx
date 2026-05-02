'use client';

import { useState, useEffect } from 'react';
import { Container, Box, ToggleButton, ToggleButtonGroup, CircularProgress, Alert, Typography, Pagination } from '@mui/material';
import { fetchNotificationsByType } from '@/lib/apiClient';
import NotificationCard from '@/components/NotificationCard';
import { Notification, ApiError, ViewedNotification } from '@/lib/types';
import { NOTIFICATION_TYPES, DEFAULT_LIMIT, DEFAULT_PAGE } from '@/lib/constants';

export default function FilterPage() {
  const [selectedType, setSelectedType] = useState<string | null>('Event');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [viewed, setViewed] = useState<ViewedNotification>({});
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const savedViewed = localStorage.getItem('viewedNotifications');
    if (savedViewed) {
      setViewed(JSON.parse(savedViewed));
    }
  }, []);

  useEffect(() => {
    const loadNotifications = async () => {
      if (!selectedType) return;

      try {
        setLoading(true);
        setError(null);
        const data = await fetchNotificationsByType(selectedType as any, {
          limit: DEFAULT_LIMIT,
          page,
        });
        setNotifications(data.notifications);
        setTotalPages(Math.ceil((data.notifications.length + DEFAULT_LIMIT - 1) / DEFAULT_LIMIT));
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [selectedType, page]);

  const handleNotificationView = (id: string) => {
    const updated = { ...viewed, [id]: true };
    setViewed(updated);
    localStorage.setItem('viewedNotifications', JSON.stringify(updated));
  };

  const handleTypeChange = (event: React.MouseEvent<HTMLElement>, newType: string | null) => {
    if (newType !== null) {
      setSelectedType(newType);
      setPage(DEFAULT_PAGE);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: { xs: 2, sm: 4 } }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
          Filter by Type
        </Typography>

        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
          <ToggleButtonGroup 
            value={selectedType} 
            exclusive 
            onChange={handleTypeChange}
            sx={{
              '& .MuiToggleButton-root': {
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                px: { xs: 1, sm: 2 }
              }
            }}
          >
            {NOTIFICATION_TYPES.map((type) => (
              <ToggleButton key={type} value={type}>
                {type}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

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
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination 
                  count={totalPages} 
                  page={page} 
                  onChange={handlePageChange}
                  color="primary"
                  size="small"
                />
              </Box>
            )}
          </Box>
        )}
        {!loading && notifications.length === 0 && !error && (
          <Alert severity="info">No notifications found for this type</Alert>
        )}
      </Box>
    </Container>
  );
}
