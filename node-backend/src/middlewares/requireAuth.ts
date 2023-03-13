import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/JwtUtils';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401)
      .json({
        error: 'Invalid token'
      });
    return
  }
  try {
    const payload = verifyToken(token)
    req.currentUser = payload
    next()
  } catch (err) {
    next()
  }
}