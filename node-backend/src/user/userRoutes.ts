import express from 'express';
import { editProfile, userProfileController } from './userController';
import { requireAuth } from '../middlewares/requireAuth';
import { validateFields } from '../middlewares/expressValidator';
import { body } from 'express-validator';
const router = express.Router();

router.get('/profile', requireAuth , userProfileController);
router.put('/profile/:id', 
  [
    body('email')
      .optional()
      .isEmail()
      .withMessage('E-mail is not valid'),
    validateFields
  ], 
  requireAuth , editProfile
);

export {
  router as userRouter
}