import { Router } from 'express';
import { myRegistrations, registerForEvent } from '../controllers/registrationController.js';
import { protect } from '../middleware/auth.js';

const router = Router();
router.post('/:eventId', protect, registerForEvent);
router.get('/me/list', protect, myRegistrations);

export default router;
