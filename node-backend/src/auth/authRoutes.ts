import express from 'express';
import { login, register } from './authController';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export {
  router as authRouter
}