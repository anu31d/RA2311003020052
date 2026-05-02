'use client';

import { Card, CardContent, Box, Typography, Chip, useMediaQuery } from '@mui/material';
import { Notification } from '@/lib/types';
import { NOTIFICATION_TYPE_COLORS } from '@/lib/constants';

interface NotificationCardProps {
  notification: Notification;
  isViewed: boolean;
  onView: (id: string) => void;
}

export default function NotificationCard({ notification, isViewed, onView }: NotificationCardProps) {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Card
      onClick={() => onView(notification.ID)}
      sx={{
        mb: 2,
        cursor: 'pointer',
        backgroundColor: isViewed ? '#f9f9f9' : '#fff',
        opacity: isViewed ? 0.7 : 1,
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-2px)',
        },
        border: isViewed ? '1px solid #ddd' : '2px solid #1976d2',
      }}
    >
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'start', 
            gap: { xs: 1, sm: 2 },
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant={isMobile ? 'body2' : 'h6'} 
              sx={{ fontWeight: 'bold', mb: 1, wordBreak: 'break-word' }}
            >
              {notification.Message}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
              <Chip
                label={notification.Type}
                size="small"
                sx={{
                  backgroundColor: NOTIFICATION_TYPE_COLORS[notification.Type],
                  color: '#fff',
                  fontSize: { xs: '0.7rem', sm: '0.8rem' }
                }}
              />
              {!isViewed && (
                <Chip
                  label="New"
                  size="small"
                  sx={{
                    backgroundColor: '#FF5722',
                    color: '#fff',
                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                  }}
                />
              )}
            </Box>
          </Box>
          <Typography 
            variant="caption" 
            sx={{ 
              color: '#999', 
              whiteSpace: 'nowrap',
              fontSize: { xs: '0.7rem', sm: '0.85rem' }
            }}
          >
            {notification.Timestamp}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
