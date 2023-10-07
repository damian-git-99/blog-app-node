import { JWTService, TokenPayload } from './JWTService'
import { Service } from 'typedi'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const key = process.env.JWT_SECRET

if (!key) {
  throw new Error('JWT_KEY must be defined in environment')
}

@Service('jwtService')
export class JWTServiceImpl implements JWTService {
  public generateToken(
    payload: TokenPayload,
    expiresIn: string | number = '1h'
  ): string {
    return jwt.sign(payload, key!, { expiresIn })
  }

  public verifyToken(token: string): TokenPayload {
    return jwt.verify(token, key!) as TokenPayload
  }
}
