import { Router } from 'express';
import { profileController } from '../controllers/profileController';
import authenticateToken from '../middleware/authMiddleware';

const router = Router();

router.post('/profiles', authenticateToken, profileController.createProfile);
router.get('/profiles', authenticateToken, profileController.findAllProfiles);
router.get('/profiles/:id', authenticateToken, profileController.findProfileById);
router.put('/profiles/:id', authenticateToken, profileController.updateProfile);
router.delete('/profiles/:id', authenticateToken, profileController.deleteProfile);

export default router;