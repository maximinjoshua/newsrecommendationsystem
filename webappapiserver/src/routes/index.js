import express from 'express'
import { userRouter } from './user.routes.js';
import { publisherRouter } from './publisher.routes.js';
import { articleRouter } from './article.routes.js';
import { testRouter } from './test.routes.js';
import { kafkaRouter } from './kafka.routes.js';
import { authRouter } from './auth.routes.js';

import { expressjwt } from 'express-jwt';

const router = express.Router();

router.use('/auth', authRouter)

router.use(expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }))

router.use('/users', userRouter)
router.use('/publishers', publisherRouter)
router.use('/articles', articleRouter)
router.use('/test', testRouter)
router.use('/kafka', kafkaRouter)


export default router