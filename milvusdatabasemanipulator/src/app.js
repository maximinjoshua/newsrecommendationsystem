import express from 'express'
import { createMilvusCollection, dropMilvusCollection, getRowsFromCollection } from './controllers/generic.controller.js'
import { fetchRecommendations } from './controllers/recommendations.controller.js'

const app = express()
const router = express.Router()
const port = 3002

app.use(express.json())

router.post('/create-collection', createMilvusCollection)
router.get('/get-data/:collection', getRowsFromCollection)
router.delete('/delete-collection/:collection', dropMilvusCollection)

router.get('/get-recommendations/:user_id', fetchRecommendations)

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})