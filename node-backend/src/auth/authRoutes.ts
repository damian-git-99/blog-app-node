import express from 'express';
import { login, logout, register } from './authController';
import { validateFields } from '../middlewares/expressValidator';
import { check } from 'express-validator';
const router = express.Router();

router.post('/register', 
  [
    check('email')
      .notEmpty().withMessage('E-mail cannot be null')
      .bail()
      .isEmail().withMessage('E-mail is not valid'),
    check('username')
      .notEmpty().withMessage('Username cannot be null'),
    check('password')
      .notEmpty().withMessage('Password cannot be null'),
    validateFields
  ], 
  register
);

router.post('/login',
  [
    check('email')
      .notEmpty().withMessage('E-mail cannot be null')
      .bail()
      .isEmail().withMessage('E-mail is not valid'),
    check('password')
      .notEmpty().withMessage('Password cannot be null'),
    validateFields
  ], 
  login
);

router.post('/logout', logout);

export {
  router as authRouter
}