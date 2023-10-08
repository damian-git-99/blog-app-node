import crypto from 'crypto'
import { Service } from 'typedi'
import { UserModel, User } from '../user/userModel'
import { UserNotFound } from '../user/errors/UserNotFound'
import { UserLogin } from './dto/UserLogin'
import { BadCredential } from './errors/BadCredentials'
import { EmailAlreadyExists } from './errors/EmailAlreadyExists'
import { InvalidLink } from './errors/InvalidLink'
import { UsernameAlreadyExists } from './errors/UsernameAlreadyExists'
import { JWTService } from './jwt/JWTService'
import { PasswordEncoder } from './passwordEncoder/PasswordEncoder'
import { EmailService } from '../shared/email/EmailService'
import { googleVerify } from './helpers/googleVerify'
import { logger } from '../config/logger'
import { UserService } from '../user/userService'

@Service()
export class AuthService {
  constructor(
    private jwtService: JWTService,
    private passwordEncoder: PasswordEncoder,
    private emailService: EmailService,
    private userService: UserService
  ) {}

  public async registerUser(user: User) {
    const userExistsByEmail = await this.userService.getUserByEmail(user.email)
    if (userExistsByEmail) {
      throw new EmailAlreadyExists(user.email)
    }

    const userExistsByUsername = await this.userService.getUserByUsername(
      user.username
    )
    if (userExistsByUsername) {
      throw new UsernameAlreadyExists(user.username)
    }

    const hashedPassword = this.passwordEncoder.encode(user.password)
    logger.info(`User Registered successfully: ${user.email}`)
    return await UserModel.create({ ...user, password: hashedPassword })
  }

  public async login(user: UserLogin) {
    const userExists = await this.userService.getUserByEmail(user.email)
    if (!userExists) {
      logger.warn(`Invalid login attempt for user: ${user.email}`)
      throw new BadCredential()
    }

    if (!this.passwordEncoder.matches(user.password, userExists.password)) {
      logger.warn(`Invalid login attempt for user: ${user.email}`)
      throw new BadCredential()
    }

    logger.info(`Login successful: ${user.email}`)
    return userExists
  }

  public async googleSignin(idToken: string) {
    const { name, email } = await googleVerify(idToken)

    const userExists = await this.userService.getUserByEmail(email!)

    if (!userExists) {
      // todo: handle username already exist
      const newUser: User = {
        username: name!,
        email: email!,
        password: crypto.randomBytes(8).toString('hex')
      }

      return await this.registerUser(newUser)
    }

    return userExists
  }

  public async recoverPassword(email: string) {
    const user = await this.userService.getUserByEmail(email)
    if (!user) {
      throw new UserNotFound()
    }
    const FIVE_MINUTES_DURATION = 60 * 5
    const token = this.jwtService.generateToken(
      { id: user.id, email: user.email },
      FIVE_MINUTES_DURATION
    )
    const link = `${
      process.env.frontend_domain || 'http://localhost:4000'
    }/reset-password?token=${token}`
    const html = `
    <div>
      <b>Please click below link to reset your password</b>
    </div>
    <div>
      <a href="${link}">Reset</a>
    </div>
  `
    await this.emailService.sendEmail(user.email, 'Password Reset', html)
    logger.info(`Password reset link sent to ${user.email} successfully`)
  }

  public async resetPasswordCheck(token: string) {
    try {
      this.jwtService.verifyToken(token)
      logger.info(
        `Password reset check request: token verified successfully: ${token}`
      )
    } catch (error) {
      throw new InvalidLink()
    }
  }

  public async resetPassword(token: string, password: string) {
    try {
      const { email } = this.jwtService.verifyToken(token)
      const user = await this.userService.getUserByEmail(email)
      if (!user) {
        throw new UserNotFound()
      }
      const hashedPassword = this.passwordEncoder.encode(password)
      await UserModel.updateOne({ _id: user.id }, { password: hashedPassword })
      logger.info(`Password reset successfully: ${email} password`)
    } catch (error) {
      throw new InvalidLink()
    }
  }
}
