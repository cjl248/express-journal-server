import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router()

router.get('/', UserController.getAllUsers)
router.get('/:id', UserController.getAUser)
router.post('/', UserController.addUser)
router.delete('/:id', UserController.deleteUser)

// LOGIN & LOGOUT
// router.post('/login', UserController.login)
// router.delete('/logout', UserController.logout)

export default router
