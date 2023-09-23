import path from 'path'
import fs from 'fs'
import { Express } from 'express'
import { logger } from './logger'

/**
 * The function `loadRoutes` is a function that loads routes from a specified directory
 * and adds them to an Express app.
 * @param {Express} app - The `app` parameter is an instance of the Express application. It is used to
 * define routes and handle HTTP requests.
 * @param {string} [directory=routes] - The `directory` parameter is a string that represents the
 * directory where the route files are located. By default, it is set to `'routes'`, which means that
 * the route files are expected to be in a directory named `'routes'` in the current working directory.
 * @param {RegExp} pattern - The `pattern` parameter is a regular expression that is used to match the
 * file names of the route files. In this case, the pattern `/Routes\.ts$/` is used to match files that
 * end with "Routes.ts".
 */
async function loadRoutes(
  app: Express,
  directory: string = 'routes',
  pattern: RegExp = /Routes\.ts$/
) {
  try {
    const files = fs.readdirSync(directory)
    for (const file of files) {
      const filePath = path.join(directory, file)
      if (fs.statSync(filePath).isDirectory()) {
        await loadRoutes(app, filePath)
      } else if (pattern.test(file)) {
        const { default: router } = await import(filePath)
        const routeName = file.replace(/\.ts$/, '').replace('routes', '')
        logger.info(`Loaded route: ${routeName}`)
        app.use(router)
      }
    }
  } catch (error) {
    logger.error('LoadRoutes Error', error)
  }
}

export default loadRoutes
