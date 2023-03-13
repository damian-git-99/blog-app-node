import jwt from 'jsonwebtoken'

const key = "SUPER_SECRET_KEY";

if (!key) {
  throw new Error('JWT_KEY must be defined')
}

interface TokenPayload {
  id: string
  email: string
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, key, { expiresIn: '1h' })
}

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, key) as TokenPayload
}