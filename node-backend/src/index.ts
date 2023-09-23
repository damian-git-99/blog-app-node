import 'reflect-metadata'
import './config/TypediContainer'
import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import mongooseSanitize from 'express-mongo-sanitize'
const { xss } = require('express-xss-sanitizer')
import { connectDB } from './config/dbConfig'
import { errorHandler } from './middlewares/errorHandler'
import { corsOptions } from './config/corsConfig'
import './config/logger'
import { logger } from './config/logger'
import loadRoutes from './config/loadRoutesConfig'

const app = express()

const port = process.env.PORT || 4000

// Data sanitization against mongo query injection
app.use(mongooseSanitize())

// Data sanitization against site script XSS
app.use(xss())

// Secure Headers HTTP
app.use(helmet())

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use(errorHandler)

app.listen(port, async () => {
  logger.info(`listening on port ${port}!`)
  await connectDB()
  await loadRoutes(app, __dirname)
})
