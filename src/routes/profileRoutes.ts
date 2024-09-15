import { Router } from 'express';
import { profileController } from '../controllers/profileController';

const router = Router();

router.get('/profiles', profileController.getProfiles);
router.post('/profiles', profileController.createProfile);
router.get('/profiles/:id', profileController.getProfileById);
router.put('/profiles/:id', profileController.updateProfile);
router.delete('/profiles/:id', profileController.deleteProfile);

export default router;
