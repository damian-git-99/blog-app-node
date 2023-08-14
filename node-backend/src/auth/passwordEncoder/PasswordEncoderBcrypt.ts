import { Service } from 'typedi'
import { PasswordEncoder } from './PasswordEncoder'
import bcrypt from 'bcrypt'

@Service('passwordEncoder')
export class PasswordEncoderBcrypt implements PasswordEncoder {
  encode(password: string): string {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
  }

  matches(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash)
  }
}
