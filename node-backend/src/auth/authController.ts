import { Request, Response } from 'express'
import { UserNotFound } from '../user/errors/UserNotFound'
import { logger } from '../config/logger'
import { Service } from 'typedi'
import { JWTService } from './jwt/JWTService'
import { AuthService } from './authService'
import { UserService } from '../user/userService'
import { Inject } from 'typedi'

@Service()
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject('jwtService') private jwtService: JWTService,
    @Inject('userService')
    private userService: UserService
  ) {}

  /**
   * @route Post /register
   */
  public async register(req: Request, res: Response) {
    const { email, password, username } = req.body
    logger.info(`User registered request`)
    const user = await this.authService.registerUser({
      email,
      password,
      username
    })
    const token = this.jwtService.generateToken({
      id: user.id,
      email: user.email
    })
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

  /**
   * @route Post /login
   */
  public async login(req: Request, res: Response) {
    const { email, password } = req.body
    logger.info(`User logged in request: ${email}`)
    const user = await this.authService.login({ email, password })
    const token = this.jwtService.generateToken({
      id: user.id!,
      email: user.email
    })
    res
      .status(200)
      .cookie('token', token, { sameSite: 'none', secure: true })
      .json({
        email: user.email,
        username: user.username,
        id: user.id
      })
  }

  /**
   * @route Post /google
   */
  public async googleSignIn(req: Request, res: Response) {
    const { clientId } = req.body
    const user = await this.authService.googleSignin(clientId)
    const token = this.jwtService.generateToken({
      id: user.id,
      email: user.email
    })
    res
      .status(200)
      .cookie('token', token, { sameSite: 'none', secure: true })
      .json({
        email: user.email,
        username: user.username,
        id: user.id
      })
  }

  /**
   * @route Post /logout
   */
  public async logout(req: Request, res: Response) {
    const token = req.cookies['token']
    logger.info(`User logged out request: ${token}`)
    res
      .cookie('token', null, { sameSite: 'none', secure: true, signed: false })
      .json('ok')
  }

  /**
   * @route Get /verify-token
   */
  public async verifyToken(req: Request, res: Response) {
    const userId = req.currentUser?.id!
    const user = await this.userService.getUserById(userId)
    if (!user) throw new UserNotFound()
    logger.info(`User verified request: ${user.email}`)
    const token = this.jwtService.generateToken({
      id: user.id!,
      email: user.email
    })
    res
      .status(200)
      .cookie('token', token, { sameSite: 'none', secure: true, signed: false })
      .json({
        email: user.email,
        username: user.username,
        id: user.id
      })
  }

  /**
   * @route POST /recover-password
   */
  public async recoverPassword(req: Request, res: Response) {
    const { email } = req.body
    logger.info(`Password recovery requested for email: ${email}`)
    await this.authService.recoverPassword(email)
    res.status(200).json('ok')
  }

  /**
   * @route GET /reset-password/:token
   */
  public async resetPasswordCheck(req: Request, res: Response) {
    const { token } = req.params
    logger.info(`Password reset request: ${token}`)
    await this.authService.resetPasswordCheck(token)
    res.status(200).json('ok')
  }

  /**
   * @route POST /reset-password/:token
   */
  public async resetPassword(req: Request, res: Response) {
    const { password } = req.body
    const { token } = req.params
    logger.info(`Password reset request for token: ${token}`)
    await this.authService.resetPassword(token, password)
    res.status(200).json('ok')
  }
}
