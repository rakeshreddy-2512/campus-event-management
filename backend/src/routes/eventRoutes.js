import { Router } from 'express';
import { createEvent, getEventAnalytics, getEvents } from '../controllers/eventController.js';
import { adminOnly, protect } from '../middleware/auth.js';

const router = Router();
router.get('/', getEvents);
router.post('/', protect, adminOnly, createEvent);
router.get('/analytics/overview', protect, adminOnly, getEventAnalytics);

export default router;
