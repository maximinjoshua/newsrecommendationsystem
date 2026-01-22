import express from 'express'
import { userRouter } from './user.routes.js';
import { publisherRouter } from './publisher.routes.js';
import { articleRouter } from './article.routes.js';

const router = express.Router();

router.use('/users', userRouter)
router.use('/publishers', publisherRouter)
router.use('/articles', articleRouter)

export default router