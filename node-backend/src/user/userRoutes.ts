import express from 'express'
import { UserController } from './userController'
import { requireAuth } from '../middlewares/requireAuth'
import { validateFields } from '../middlewares/expressValidator'
import { body } from 'express-validator'
import Container from 'typedi'
const router = express.Router()

const userController = Container.get(UserController)

router.get('/profile', requireAuth, userController.userProfileController)
router.put(
  '/profile/:id',
  [
    body('email').optional().isEmail().withMessage('E-mail is not valid'),
    validateFields
  ],
  requireAuth,
  userController.editProfile
)

router.post(
  '/add-favorite-post/:postId',
  requireAuth,
  userController.addFavoritePost
)
router.delete(
  '/delete-favorite-post/:postId',
  requireAuth,
  userController.deleteFavoritePost
)
router.get(
  '/is-favorite-post/:postId',
  requireAuth,
  userController.isPostMarkedAsFavorite
)
router.get(
  '/favorite-posts',
  requireAuth,
  userController.getFavoritePostsByUser
)

export { router as userRouter }
