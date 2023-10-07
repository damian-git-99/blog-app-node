import crypto from 'crypto'
import { Container } from 'typedi'
import { UserModel, User } from '../user/userModel'
import { getUserByEmail, getUserByUsername } from '../user/userService'
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

const jwtService = Container.get<JWTService>('jwtService')
const passwordEncoder = Container.get<PasswordEncoder>('passwordEncoder')
const emailService = Container.get<EmailService>('emailService')

export const registerUser = async (user: User) => {
  const userExistsByEmail = await getUserByEmail(user.email)
  if (userExistsByEmail) {
    throw new EmailAlreadyExists(user.email)
  }

  const userExistsByUsername = await getUserByUsername(user.username)
  if (userExistsByUsername) {
    throw new UsernameAlreadyExists(user.username)
  }

  const hashedPassword = passwordEncoder.encode(user.password)
  logger.info(`User Registered successfully: ${user.email}`)
  return await UserModel.create({ ...user, password: hashedPassword })
}

export const login = async (user: UserLogin) => {
  const userExists = await getUserByEmail(user.email)
  if (!userExists) {
    logger.warn(`Invalid login attempt for user: ${user.email}`)
    throw new BadCredential()
  }

  if (!passwordEncoder.matches(user.password, userExists.password)) {
    logger.warn(`Invalid login attempt for user: ${user.email}`)
    throw new BadCredential()
  }

  logger.info(`Login successful: ${user.email}`)
  return userExists
}

export const googleSignin = async (idToken: string) => {
  const { name, email } = await googleVerify(idToken)

  const userExists = await getUserByEmail(email!)

  if (!userExists) {
    // todo: handle username already exist
    const newUser: User = {
      username: name!,
      email: email!,
      password: crypto.randomBytes(8).toString('hex')
    }

    return await registerUser(newUser)
  }

  return userExists
}

export const recoverPassword = async (email: string) => {
  const user = await getUserByEmail(email)
  if (!user) {
    throw new UserNotFound()
  }
  const FIVE_MINUTES_DURATION = 60 * 5
  const token = jwtService.generateToken(
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
  await emailService.sendEmail(user.email, 'Password Reset', html)
  logger.info(`Password reset link sent to ${user.email} successfully`)
}

export const resetPasswordCheck = (token: string) => {
  try {
    jwtService.verifyToken(token)
    logger.info(
      `Password reset check request: token verified successfully: ${token}`
    )
  } catch (error) {
    throw new InvalidLink()
  }
}

export const resetPassword = async (token: string, password: string) => {
  try {
    const { email } = jwtService.verifyToken(token)
    const user = await getUserByEmail(email)
    if (!user) {
      throw new UserNotFound()
    }
    const hashedPassword = passwordEncoder.encode(password)
    await UserModel.updateOne({ _id: user.id }, { password: hashedPassword })
    logger.info(`Password reset successfully: ${email} password`)
  } catch (error) {
    throw new InvalidLink()
  }
}
