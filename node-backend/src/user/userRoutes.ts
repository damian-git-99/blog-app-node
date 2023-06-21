import express from 'express'
import {
  editProfile,
  userProfileController,
  addFavoritePost,
  deleteFavoritePost,
  isPostMarkedAsFavorite
} from './userController'
import { requireAuth } from '../middlewares/requireAuth'
import { validateFields } from '../middlewares/expressValidator'
import { body } from 'express-validator'
const router = express.Router()

router.get('/profile', requireAuth, userProfileController)
router.put(
  '/profile/:id',
  [
    body('email').optional().isEmail().withMessage('E-mail is not valid'),
    validateFields
  ],
  requireAuth,
  editProfile
)

router.post('/add-favorite-post/:postId', requireAuth, addFavoritePost)
router.delete('/delete-favorite-post/:postId', requireAuth, deleteFavoritePost)
router.get('/is-favorite-post/:postId', requireAuth, isPostMarkedAsFavorite)

export { router as userRouter }
