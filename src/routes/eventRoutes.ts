import express from 'express';
import { eventController } from '../controllers/eventController';
import authenticateToken from '../middleware/authMiddleware';

const router = express.Router();

router.post('/events', authenticateToken, eventController.createEvent);
router.get('/events', authenticateToken, eventController.findAllEvents);
router.get('/events/:id', authenticateToken, eventController.findEventById);
router.put('/events/:id', authenticateToken, eventController.updateEvent);
router.delete('/events/:id', authenticateToken, eventController.deleteEvent);

export default router;
