import { Request, Response } from 'express'
import * as authService from './authService'
import { getUserById } from '../user/userService'
import { generateToken } from './JwtUtils'
import { UserNotFound } from '../user/errors/UserNotFound'
import { logger } from '../config/logger'

//@route Post /register
export const register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body
  logger.info(`User registered request`)
  const user = await authService.registerUser({ email, password, username })
  const token = generateToken({ id: user.id, email: user.email })
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
  logger.info(`User logged in request: ${email}`)
  const user = await authService.login({ email, password })
  const token = generateToken({ id: user.id, email: user.email })
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
  logger.info(`User logged out request: ${token}`)
  res
    .cookie('token', null, { sameSite: 'none', secure: true, signed: false })
    .json('ok')
}

//@route Get /verify-token
export const verifyToken = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id!
  const user = await getUserById(userId)
  if (!user) throw new UserNotFound()
  logger.info(`User verified request: ${user.email}`)
  const token = generateToken({ id: user.id, email: user.email })
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
  logger.info(`Password recovery requested for email: ${email}`)
  await authService.recoverPassword(email)
  res.status(200).json('ok')
}

//@route GET /reset-password/:token
export const resetPasswordCheck = async (req: Request, res: Response) => {
  const { token } = req.params
  logger.info(`Password reset request: ${token}`)
  await authService.resetPasswordCheck(token)
  res.status(200).json('ok')
}

//@route POST /reset-password/:token
export const resetPassword = async (req: Request, res: Response) => {
  const { password } = req.body
  const { token } = req.params
  logger.info(`Password reset request for token: ${token}`)
  await authService.resetPassword(token, password)
  res.status(200).json('ok')
}
