import express from 'express'
import { login, logout, register, verifyToken } from './authController'
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

router.post('/logout', logout)

router.get('/verify-token', requireAuth, verifyToken)

export { router as authRouter }
