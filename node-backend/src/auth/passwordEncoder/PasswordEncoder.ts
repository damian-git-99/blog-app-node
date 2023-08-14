export interface PasswordEncoder {
  encode(password: string): string
  matches(password: string, hash: string): boolean
}
