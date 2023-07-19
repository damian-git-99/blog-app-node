import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../auth/JwtUtils'
import { logger } from '../config/logger'

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies
  try {
    if (token) {
      const payload = verifyToken(token)
      req.currentUser = payload
      logger.info(`Token verified for user: ${payload.email}`)
    }
    next()
  } catch (err) {
    logger.error(`Error verifying token: ${err}`)
    next()
  }
}
