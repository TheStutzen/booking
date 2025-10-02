import 'dotenv/config'
import * as express from 'express'
import * as session from 'express-session'
import * as cookieParser from 'cookie-parser'
import { Routes } from './adapters/api'
import { createSessionConfig } from './libs/cookie/sessiondb.config'
import { mariaDbDataSource } from './db'

const port = process.env.PORT
const host = process.env.HOST

async function startServer() {
  await mariaDbDataSource
    .initialize()
    .then(() => console.info('✅ Connected to MariaDb'))
    .catch((err) => console.error(err))

  const app = express()

  app.use(express.json())
  app.use(cookieParser())
  app.use(session(createSessionConfig()))

  new Routes(app)

  app.listen(port, () => {
    console.info(`🚀 Express is running at http://${host}:${port}`)
  })
}

startServer().catch((err) => {
  console.error(err)
})
