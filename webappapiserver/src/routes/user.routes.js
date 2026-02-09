import express from 'express'
import { userController } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', userController.getUsers)
router.post('/create', userController.createUsers)
router.get('/create-table', userController.createUserTable)

export const userRouter = router