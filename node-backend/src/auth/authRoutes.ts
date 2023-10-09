import express from 'express'
import { body } from 'express-validator'
import { AuthController } from './authController'
import { validateFields } from '../middlewares/expressValidator'
import { requireAuth } from '../middlewares/requireAuth'
import Container from 'typedi'

const router = express.Router()

const authController = Container.get(AuthController)

router.post(
  '/register',
  [
    body('email')
      .notEmpty()
      .withMessage('E-mail is required')
      .bail()
      .isEmail()
      .withMessage('E-mail is not valid'),
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
    validateFields
  ],
  authController.register.bind(authController)
)

router.post(
  '/login',
  [
    body('email')
      .notEmpty()
      .withMessage('E-mail is required')
      .bail()
      .isEmail()
      .withMessage('E-mail is not valid'),
    body('password').notEmpty().withMessage('Password is required'),
    validateFields
  ],
  authController.login.bind(authController)
)

router.post(
  '/google',
  [
    body('clientId', 'El id_token is necessary').not().isEmpty(),
    validateFields
  ],
  authController.googleSignIn.bind(authController)
)

router.post('/logout', authController.logout)

router.get(
  '/verify-token',
  requireAuth,
  authController.verifyToken.bind(authController)
)
router.post(
  '/recover-password',
  [body('email').notEmpty().withMessage('Email is required'), validateFields],
  authController.recoverPassword.bind(authController)
)
router.get(
  '/reset-password/:token',
  authController.resetPasswordCheck.bind(authController)
)
router.post(
  '/reset-password/:token',
  [
    body('password').notEmpty().withMessage('Password is required'),
    validateFields
  ],
  authController.resetPassword.bind(authController)
)

export { router as authRouter }
