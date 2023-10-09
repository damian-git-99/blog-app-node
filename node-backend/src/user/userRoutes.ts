import express from 'express'
import { UserController } from './userController'
import { requireAuth } from '../middlewares/requireAuth'
import { validateFields } from '../middlewares/expressValidator'
import { body } from 'express-validator'
import Container from 'typedi'
const router = express.Router()

const userController = Container.get(UserController)

router.get(
  '/profile',
  requireAuth,
  userController.userProfileController.bind(userController)
)
router.put(
  '/profile/:id',
  [
    body('email').optional().isEmail().withMessage('E-mail is not valid'),
    validateFields
  ],
  requireAuth,
  userController.editProfile.bind(userController)
)

router.post(
  '/add-favorite-post/:postId',
  requireAuth,
  userController.addFavoritePost.bind(userController)
)
router.delete(
  '/delete-favorite-post/:postId',
  requireAuth,
  userController.deleteFavoritePost.bind(userController)
)
router.get(
  '/is-favorite-post/:postId',
  requireAuth,
  userController.isPostMarkedAsFavorite.bind(userController)
)
router.get(
  '/favorite-posts',
  requireAuth,
  userController.getFavoritePostsByUser.bind(userController)
)

export { router as userRouter }
