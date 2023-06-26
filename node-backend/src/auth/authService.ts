import { sendPasswordReset } from '../email/emailService'
import { UserNotFound } from '../user/errors/UserNotFound'
import { User, UserModel } from '../user/userModel'
import { getUserByEmail, getUserByUsername } from '../user/userService'
import { generateToken, verifyToken } from './JwtUtils'
import { UserLogin } from './dto/UserLogin'
import { BadCredential } from './errors/BadCredentials'
import { EmailAlreadyExists } from './errors/EmailAlreadyExists'
import { InvalidLink } from './errors/InvalidLink'
import { UsernameAlreadyExists } from './errors/UsernameAlreadyExists'
import { encryptPassword, comparePasswords } from './passwordUtils'

export const registerUser = async (user: User) => {
  const userExistsByEmail = await getUserByEmail(user.email)
  if (userExistsByEmail) {
    throw new EmailAlreadyExists(user.email)
  }

  const userExistsByUsername = await getUserByUsername(user.username)
  if (userExistsByUsername) {
    throw new UsernameAlreadyExists(user.username)
  }

  const hashedPassword = encryptPassword(user.password)
  return await UserModel.create({ ...user, password: hashedPassword })
}

export const login = async (user: UserLogin) => {
  const userExists = await getUserByEmail(user.email)
  if (!userExists) {
    throw new BadCredential()
  }

  if (!comparePasswords(user.password, userExists.password)) {
    throw new BadCredential()
  }

  return userExists
}

export const recoverPassword = async (email: string) => {
  const user = await getUserByEmail(email)
  if (!user) {
    throw new UserNotFound()
  }
  const TEN_MINUTES = 60 * 10
  const token = generateToken({ id: user.id, email: user.email }, TEN_MINUTES)
  const link = `http://localhost:4000/reset-password/${token}`
  console.log(link)
  await sendPasswordReset(user.email, link)
}

export const resetPasswordCheck = (token: string) => {
  try {
    verifyToken(token)
  } catch (error) {
    throw new InvalidLink()
  }
}

export const resetPassword = async (token: string, password: string) => {
  try {
    const { email } = verifyToken(token)
    const user = await getUserByEmail(email)
    if (!user) {
      throw new UserNotFound()
    }
    const hashedPassword = encryptPassword(password)
    await UserModel.updateOne({ _id: user.id }, { password: hashedPassword })
  } catch (error) {
    throw new InvalidLink()
  }
}
