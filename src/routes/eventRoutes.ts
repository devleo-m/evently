import express from 'express';
import { eventController } from '../controllers/eventController';
import authenticateToken from '../middleware/authMiddleware';

const router = express.Router();

router.get('/events', authenticateToken, eventController.getEvents);
router.post('/events', authenticateToken, eventController.createEvent);
router.get('/events/:id', authenticateToken, eventController.getEventById);
router.put('/events/:id', authenticateToken, eventController.updateEvent);
router.delete('/events/:id', authenticateToken, eventController.deleteEvent);

export default router;
