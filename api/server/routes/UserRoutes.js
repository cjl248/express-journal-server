import { Router } from 'express';
import UserController from '../controllers/UserController';
import JournalRoutes from './JournalRoutes.js'

const userRouter = Router()

userRouter.get('/', UserController.getAllUsers)
userRouter.get('/:id', UserController.getAUser)
userRouter.post('/', UserController.addUser)
userRouter.delete('/:id', UserController.deleteUser)

userRouter.use('/:UserId/journals', JournalRoutes)

export default userRouter
