export interface TokenPayload {
  id: string
  email: string
}

export interface JWTService {
  generateToken(payload: TokenPayload, expiresIn?: string | number): string
  verifyToken(token: string): TokenPayload
}
