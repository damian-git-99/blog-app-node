import express from 'express';
import { register } from './authController';
const router = express.Router();

router.post('/register', register);

export {
  router as authRouter
}