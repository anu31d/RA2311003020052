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
        backgroundColor: isViewed ? '#FFF0F3' : '#FFFBFC',
        opacity: isViewed ? 0.7 : 1,
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-2px)',
          backgroundColor: '#FFF5F8',
        },
        border: isViewed ? '1px solid #E8C8D5' : '2px solid #FFB6C1',
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
                  color: '#333',
                  fontSize: { xs: '0.7rem', sm: '0.8rem' }
                }}
              />
              {!isViewed && (
                <Chip
                  label="New"
                  size="small"
                  sx={{
                    backgroundColor: '#FFB6C1',
                    color: '#333',
                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                  }}
                />
              )}
            </Box>
          </Box>
          <Typography 
            variant="caption" 
            sx={{ 
              color: '#B8A0A8', 
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
