import express from 'express';
import { userProfileController } from './userController';
import { requireAuth } from '../middlewares/requireAuth';
const router = express.Router();

router.get('/profile', requireAuth ,userProfileController);

export {
  router as userRouter
}