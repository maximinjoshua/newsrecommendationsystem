import express from 'express'
import { createArticleTable, fetchArticlesFromPostgres, insertUsingTheScript } from './controller.js'

const app = express()
const router = express.Router()
const port = 3001

// app.use(express.raw())

router.get('/articles/:date', fetchArticlesFromPostgres)
router.post('/articles/create-table', createArticleTable)
router.post('/article/insert-using-dascript', insertUsingTheScript)

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})