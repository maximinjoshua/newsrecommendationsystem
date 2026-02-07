import express from 'express'
import { userRouter } from './user.routes.js';
import { publisherRouter } from './publisher.routes.js';
import { articleRouter } from './article.routes.js';
import { testRouter } from './test.routes.js';
import { kafkaRouter } from './kafka.routes.js';

const router = express.Router();

router.use('/users', userRouter)
router.use('/publishers', publisherRouter)
router.use('/articles', articleRouter)
router.use('/test', testRouter)
router.use('/kafka', kafkaRouter)

export default router