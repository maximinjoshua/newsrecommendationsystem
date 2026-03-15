import express from 'express'
import { createMilvusCollection, dropMilvusCollection, getRowsFromCollection } from './controllers/generic.controller.js'
import { fetchRecommendations } from './controllers/recommendations.controller.js'
import { globalErrorHandler } from './helpers/middleware.js'

const app = express()
const router = express.Router()
const port = 3002

app.use(express.json())

router.post('/create-collection', createMilvusCollection)
router.get('/get-data/:collection', getRowsFromCollection)
router.delete('/delete-collection/:collection', dropMilvusCollection)

router.get('/get-recommendations/:user_id', fetchRecommendations)

app.use(router)
app.use(globalErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})