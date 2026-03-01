// import dotenv from 'dotenv'

// dotenv.config({ path: 'src/.env' })

import express from 'express'
import router from './routes/index.js'
import './cronjobs/index.cron.js'
import { logError } from './helpers/logger.js'
import cors from 'cors'

const app = express()
const port = 3000

var corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(router)
app.use(logError)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})