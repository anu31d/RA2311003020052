import { Router, Response } from 'express';
import notificationApiClient from '../services/notificationApiClient';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { QueryParams } from '../types';

const router = Router();

router.get('/notifications', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const params: QueryParams = {
      limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
      page: req.query.page ? parseInt(req.query.page as string) : undefined,
      notification_type: req.query.notification_type as 'Event' | 'Result' | 'Placement' | undefined,
    };

    const notifications = await notificationApiClient.getNotifications(params);

    res.json(notifications);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Failed to fetch notifications',
    });
  }
});

export default router;
