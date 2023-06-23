import { Request, Response } from 'express'
import * as authService from './authService'
import { getUserById } from '../user/userService'
import { generateToken } from './JwtUtils'
import { UserNotFound } from '../user/errors/UserNotFound'

//@route Post /register
export const register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body
  const user = await authService.registerUser({ email, password, username })
  const token = generateToken({ id: user.id, email: user.email })
  res
    .status(201)
    .cookie('token', token, { sameSite: 'none', secure: true, signed: false })
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
  res
    .status(200)
    .cookie('token', token, { sameSite: 'none', secure: true, signed: false })
    .json({
      email: user.email,
      username: user.username,
      id: user.id
    })
}

//@route Post /logout
export const logout = async (req: Request, res: Response) => {
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
  res
    .status(200)
    .cookie('token', token, { sameSite: 'none', secure: true, signed: false })
    .json({
      email: user.email,
      username: user.username,
      id: user.id
    })
}
