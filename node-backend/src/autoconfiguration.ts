import 'reflect-metadata'
import * as fs from 'fs'
import * as path from 'path'
import { logger } from './config/logger'

const rootDirectory = path.join(__dirname)

/**
 * Recursively searches for TypeScript files in the specified directory and its subdirectories,
 * checks if the file exports a class with the @Service decorator, and automatically registers
 * it in the TypeDI container.
 * @param directory The directory to start searching from.
 */
export function loadAutoConfiguration(directory: string = rootDirectory) {
  const items = fs.readdirSync(directory)
  items.forEach((item) => {
    if (item !== 'node_modules') {
      const itemPath = path.join(directory, item)
      const stats = fs.statSync(itemPath)

      try {
        if (stats.isDirectory()) {
          loadAutoConfiguration(itemPath)
        } else if (
          stats.isFile() &&
          item.endsWith('.ts') &&
          item !== 'index.ts' &&
          item !== 'app.ts'
        ) {
          const serviceName = path.basename(item, '.ts')
          const serviceModule = require(itemPath)
        }
      } catch (error) {
        logger.warn(`Error: cannot load auto configuration: file ${item}`)
      }
    }
  })
}
