import express from 'express';
import { eventController } from '../controllers/eventController';

const router = express.Router();

router.get('/events', eventController.getEvents);
router.post('/events', eventController.createEvent);
router.get('/events/:id', eventController.getEventById);
router.put('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

export default router;
