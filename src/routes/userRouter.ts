import { Router } from 'express';
import { userController } from '../controllers/userController';
import authenticateToken from '../middleware/authMiddleware';

const router = Router();

router.get('/users', authenticateToken, userController.getUsers);
router.post('/users', authenticateToken, userController.createUser);
router.get('/users/:id', authenticateToken, userController.getUserById);
router.put('/users/:id', authenticateToken, userController.updateUser);
router.delete('/users/:id', authenticateToken, userController.deleteUser);

export default router;