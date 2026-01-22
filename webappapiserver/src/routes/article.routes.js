import { articleController } from '../controllers/article.controller.js';
import express from 'express'

const router = express.Router();

router.get('/', articleController.getArticles)
router.post('/create', articleController.createArticles)
router.post('/update', articleController.updateArticles)
router.delete('/delete', articleController.deleteArticles)
router.post('/create-table', articleController.createArticleTable)

export const articleRouter = router