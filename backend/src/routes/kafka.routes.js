import express from 'express'
import { kafkaController } from '../controllers/kafka.controller.js';

const router = express.Router();

router.post('/create-topic', kafkaController.createTopic)

export const kafkaRouter = router