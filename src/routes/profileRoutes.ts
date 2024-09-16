import { Router } from 'express';
import { profileController } from '../controllers/profileController';
import authenticateToken from '../middleware/authMiddleware';

const router = Router();

router.get('/profiles', authenticateToken, profileController.getProfiles);
router.post('/profiles', authenticateToken, profileController.createProfile);
router.get('/profiles/:id', authenticateToken, profileController.getProfileById);
router.put('/profiles/:id', authenticateToken, profileController.updateProfile);
router.delete('/profiles/:id', authenticateToken, profileController.deleteProfile);

export default router;