import express from 'express';
import { login, logout, register } from './authController';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export {
  router as authRouter
}