import express from 'express'
import {
  editProfile,
  userProfileController,
  addFavoritePost,
  deleteFavoritePost,
  isPostMarkedAsFavorite,
  getFavoritePostsByUser
} from './userController'
import { requireAuth } from '../middlewares/requireAuth'
import { validateFields } from '../middlewares/expressValidator'
import { body } from 'express-validator'
const router = express.Router()

router.get(`/users/profile`, requireAuth, userProfileController)
router.put(
  '/users/profile/:id',
  [
    body('email').optional().isEmail().withMessage('E-mail is not valid'),
    validateFields
  ],
  requireAuth,
  editProfile
)

router.post(`/users/add-favorite-post/:postId`, requireAuth, addFavoritePost)
router.delete(
  `/users/delete-favorite-post/:postId`,
  requireAuth,
  deleteFavoritePost
)
router.get(
  `/users/is-favorite-post/:postId`,
  requireAuth,
  isPostMarkedAsFavorite
)
router.get(`/users/favorite-posts`, requireAuth, getFavoritePostsByUser)

export default router
