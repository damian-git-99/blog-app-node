import express from 'express'
import {
  login,
  logout,
  register,
  verifyToken,
  recoverPassword,
  resetPassword,
  resetPasswordCheck,
  googleSignIn
} from './authController'
import { validateFields } from '../middlewares/expressValidator'
import { body } from 'express-validator'
import { requireAuth } from '../middlewares/requireAuth'
const router = express.Router()

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
  register
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
  login
)

router.post(
  '/google',
  [
    body('clientId', 'El id_token is necessary').not().isEmpty(),
    validateFields
  ],
  googleSignIn
)

router.post('/logout', logout)

router.get('/verify-token', requireAuth, verifyToken)
router.post(
  '/recover-password',
  [body('email').notEmpty().withMessage('Email is required'), validateFields],
  recoverPassword
)
router.get('/reset-password/:token', resetPasswordCheck)
router.post(
  '/reset-password/:token',
  [
    body('password').notEmpty().withMessage('Password is required'),
    validateFields
  ],
  resetPassword
)

export default router
