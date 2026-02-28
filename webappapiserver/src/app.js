// import dotenv from 'dotenv'

// dotenv.config({ path: 'src/.env' })

import express from 'express'
import router from './routes/index.js'
import './cronjobs/index.cron.js'
import { logError } from './helpers/logger.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(router)
app.use(logError)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})