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
  authController.register
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
  authController.login
)

router.post(
  '/google',
  [
    body('clientId', 'El id_token is necessary').not().isEmpty(),
    validateFields
  ],
  authController.googleSignIn
)

router.post('/logout', authController.logout)

router.get('/verify-token', requireAuth, authController.verifyToken)
router.post(
  '/recover-password',
  [body('email').notEmpty().withMessage('Email is required'), validateFields],
  authController.recoverPassword
)
router.get('/reset-password/:token', authController.resetPasswordCheck)
router.post(
  '/reset-password/:token',
  [
    body('password').notEmpty().withMessage('Password is required'),
    validateFields
  ],
  authController.resetPassword
)

export { router as authRouter }
