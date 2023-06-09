import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

const key = process.env.JWT_SECRET

if (!key) {
  throw new Error('JWT_KEY must be defined in environment')
}

interface TokenPayload {
  id: string
  email: string
}

export const generateToken = (
  payload: TokenPayload,
  expiresIn: string | number = '1h'
): string => {
  return jwt.sign(payload, key, { expiresIn })
}

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, key) as TokenPayload
}
