import { User } from '../user/userModel'
import { UserLogin } from './dto/UserLogin'

export interface AuthService {
  registerUser(user: User): Promise<User>
  login(user: UserLogin): Promise<User>
  googleSignin(idToken: string): Promise<User>
  recoverPassword(email: string): Promise<void>
  resetPasswordCheck(token: string): Promise<void>
  resetPassword(token: string, password: string): Promise<void>
}
