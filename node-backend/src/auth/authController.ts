import { Request, Response } from 'express'
import * as authService from './authService'
import { getUserById } from '../user/userService'
import { generateToken } from './JwtUtils'
import { UserNotFound } from '../user/errors/UserNotFound'
import { logger } from '../config/logger'

//@route Post /register
export const register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body
  const user = await authService.registerUser({ email, password, username })
  const token = generateToken({ id: user.id, email: user.email })
  logger.info(`User registered: ${user.email}`)
  res
    .status(201)
    .cookie('token', token, { sameSite: 'none', secure: true })
    .json({
      status: 201,
      email: user.email,
      username: user.username,
      id: user._id
    })
}

//@route Post /login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await authService.login({ email, password })
  const token = generateToken({ id: user.id, email: user.email })
  logger.info(`User logged in: ${user.email}`)
  res
    .status(200)
    .cookie('token', token, { sameSite: 'none', secure: true })
    .json({
      email: user.email,
      username: user.username,
      id: user.id
    })
}

//@route Post /logout
export const logout = async (req: Request, res: Response) => {
  const token = req.cookies['token']
  logger.info(`User logged out: ${token}`)
  res
    .cookie('token', null, { sameSite: 'none', secure: true, signed: false })
    .json('ok')
}

//@route Get /verify-token
export const verifyToken = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id!
  const user = await getUserById(userId)
  if (!user) throw new UserNotFound()
  const token = generateToken({ id: user.id, email: user.email })
  logger.info(`User verified: ${user.email}`)
  res
    .status(200)
    .cookie('token', token, { sameSite: 'none', secure: true, signed: false })
    .json({
      email: user.email,
      username: user.username,
      id: user.id
    })
}

//@route POST /recover-password
export const recoverPassword = async (req: Request, res: Response) => {
  const { email } = req.body
  await authService.recoverPassword(email)
  logger.info(`Password recovery requested for email: ${email}`)
  res.status(200).json('ok')
}

//@route GET /reset-password/:token
export const resetPasswordCheck = async (req: Request, res: Response) => {
  const { token } = req.params
  await authService.resetPasswordCheck(token)
  logger.info(`Password reset token verified for token: ${token}`)
  res.status(200).json('ok')
}

//@route POST /reset-password/:token
export const resetPassword = async (req: Request, res: Response) => {
  const { password } = req.body
  const { token } = req.params
  await authService.resetPassword(token, password)
  logger.info(`Password reset for token: ${token}`)
  res.status(200).json('ok')
}
