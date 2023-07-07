import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import { logger } from './logger'
dotenv.config()

const URI = process.env.MONGO_URI

export const connectDB = async () => {
  try {
    await mongoose.connect(URI!)
    logger.info('The connection with the database was successful')
  } catch (error) {
    logger.error('The connection with the database was unsuccessful: ' + error)
    process.exit(1)
  }
}
