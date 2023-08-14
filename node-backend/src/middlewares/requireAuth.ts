import { Request, Response, NextFunction } from 'express'
import Container from 'typedi'
import { JWTService } from '../auth/jwt/JWTService'

const jwtService = Container.get<JWTService>('jwtService')

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies
  if (!token) {
    res.status(401).json({
      error: 'Invalid token'
    })
    return
  }
  try {
    const payload = jwtService.verifyToken(token)
    req.currentUser = payload
    next()
  } catch (err) {
    res.status(401).json({
      error: 'Invalid token'
    })
  }
}
