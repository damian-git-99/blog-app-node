import express from 'express';
import { login, logout, register } from './authController';
import { validateFields } from '../middlewares/expressValidator';
import { body } from 'express-validator';
const router = express.Router();

router.post('/register', 
  [
    body('email')
      .notEmpty().withMessage('E-mail cannot be null')
      .bail()
      .isEmail().withMessage('E-mail is not valid'),
    body('username')
      .notEmpty().withMessage('Username cannot be null'),
    body('password')
      .notEmpty().withMessage('Password cannot be null'),
    validateFields
  ], 
  register
);

router.post('/login',
  [
    body('email')
      .notEmpty().withMessage('E-mail cannot be null')
      .bail()
      .isEmail().withMessage('E-mail is not valid'),
    body('password')
      .notEmpty().withMessage('Password cannot be null'),
    validateFields
  ], 
  login
);

router.post('/logout', logout);

export {
  router as authRouter
}