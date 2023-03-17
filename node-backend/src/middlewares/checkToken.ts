import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/JwtUtils';

export const checkToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  try {
    if (token) {
      const payload = verifyToken(token)
      req.currentUser = payload
    }
    next()
  } catch (err) {
    next()
  }
}