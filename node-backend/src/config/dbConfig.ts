import mongoose from 'mongoose'
import config from 'config'
import { logger } from './logger'

const databaseConfig = config.get('database') as { uri: string }

export const connectDB = async () => {
  try {
    await mongoose.connect(databaseConfig.uri)
    logger.info('The connection with the database was successful')
  } catch (error) {
    logger.error('The connection with the database was unsuccessful: ' + error)
    process.exit(1)
  }
}
