import { Router } from 'express';
import { participationController } from '../controllers/participationController';
import authenticateToken from '../middleware/authMiddleware';

const router = Router();

router.post('/participations', authenticateToken, participationController.createParticipation);
router.get('/participations', authenticateToken, participationController.findAllParticipations);
router.get('/participations/:id', authenticateToken, participationController.findParticipationById);
router.put('/participations/:id', authenticateToken, participationController.updateParticipation);
router.delete('/participations/:id', authenticateToken, participationController.deleteParticipation);

export default router;