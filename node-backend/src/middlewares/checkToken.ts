import { Request, Response, NextFunction } from 'express'
import { logger } from '../config/logger'
import Container from 'typedi'
import { JWTService } from '../auth/jwt/JWTService'

const jwtService = Container.get<JWTService>('jwtService')

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies
  try {
    if (token) {
      const payload = jwtService.verifyToken(token)
      req.currentUser = payload
      logger.info(`Token verified for user: ${payload.email}`)
    }
    next()
  } catch (err) {
    logger.error(`Error verifying token: ${err}`)
    next()
  }
}
