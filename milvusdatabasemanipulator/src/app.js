import express from 'express'
import { createMilvusCollection } from './controller.js'

const app = express()
const router = express.Router()
const port = 3002

app.use(express.json())

router.post('/create-collection', createMilvusCollection)

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})