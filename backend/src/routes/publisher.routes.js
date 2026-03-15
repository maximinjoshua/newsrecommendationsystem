import { publisherController } from '../controllers/publisher.controller.js';
import express from 'express'

const router = express.Router();

router.get('/', publisherController.getPublishers)
router.post('/create', publisherController.createPublishers)
router.post('/update', publisherController.updatePublishers)
router.delete('/delete', publisherController.deletePublishers)
router.post('/create-table', publisherController.createPublisherTable)

export const publisherRouter = router