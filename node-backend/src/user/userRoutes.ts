import express from 'express';
import { editProfile, userProfileController } from './userController';
import { requireAuth } from '../middlewares/requireAuth';
const router = express.Router();

router.get('/profile', requireAuth , userProfileController);
router.put('/profile/:id', requireAuth , editProfile);

export {
  router as userRouter
}