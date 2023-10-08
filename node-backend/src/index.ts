import 'reflect-metadata'
import './config/TypediContainer'
import express, { Application } from 'express'
import cors from 'cors'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import mongooseSanitize from 'express-mongo-sanitize'
const { xss } = require('express-xss-sanitizer')
import { authRouter } from './auth/authRoutes'
import { connectDB } from './config/dbConfig'
import { errorHandler } from './middlewares/errorHandler'
import { userRouter } from './user/userRoutes'
import { postRouter } from './posts/postRoutes'
import { corsOptions } from './config/corsConfig'
import './config/logger'
import { logger } from './config/logger'

class Server {
  private app: Application

  constructor() {
    this.app = express()
    this.setupMiddlewares()
    this.setupRoutes()
    this.startServer()
  }

  private setupMiddlewares() {
    // Data sanitization against mongo query injection
    this.app.use(mongooseSanitize())

    // Data sanitization against site script XSS
    this.app.use(xss())

    // Secure Headers HTTP
    this.app.use(helmet())

    this.app.use(cors(corsOptions))
    this.app.use(express.json())
    this.app.use(cookieParser())
  }

  private setupRoutes() {
    this.app.use(authRouter)
    this.app.use('/users', userRouter)
    this.app.use('/posts', postRouter)
    this.app.use(errorHandler)
  }

  private startServer() {
    const port = process.env.PORT || 4000
    this.app.listen(port, () => {
      logger.info(`listening on port ${port}!`)
      connectDB()
    })
  }
}

new Server()
