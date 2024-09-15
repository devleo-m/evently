import { Router } from 'express';
import { participationController } from '../controllers/participationController';

const router = Router();

router.get('/participations', participationController.getParticipations);
router.post('/participations', participationController.createParticipation);
router.get('/participations/:id', participationController.getParticipationById);
router.put('/participations/:id', participationController.updateParticipation);
router.delete('/participations/:id', participationController.deleteParticipation);

export default router;