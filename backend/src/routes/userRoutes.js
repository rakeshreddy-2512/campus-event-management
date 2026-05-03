import { Router } from 'express';
import { protect } from '../middleware/auth.js';

const router = Router();
router.get('/notifications', protect, async (req, res) => {
  res.json(req.user.notifications || []);
});

export default router;
