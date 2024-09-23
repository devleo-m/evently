import { Router } from 'express';
import { userController } from '../controllers/userController';
import authenticateToken from '../middleware/authMiddleware';

const router = Router();

router.post('/users', authenticateToken, userController.createUser);
router.get('/users', authenticateToken, userController.findAllUsers);
router.get('/users/:id', authenticateToken, userController.findUserById);
router.put('/users/:id', authenticateToken, userController.updateUser);
router.delete('/users/:id', authenticateToken, userController.deleteUser);

export default router;