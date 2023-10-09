import express from 'express'
import multer from 'multer'
import { requireAuth } from '../middlewares/requireAuth'
import { checkToken } from '../middlewares/checkToken'
import { body } from 'express-validator'
import { validateFields } from '../middlewares/expressValidator'
import Container from 'typedi'
import { PostController } from './postController'

const router = express.Router()
const upload = multer()

const postController = Container.get(PostController)

router.post(
  '/',
  [requireAuth, upload.single('file')],
  [
    body('title', 'Title is required').not().isEmpty(),
    body('summary', 'Summary is required').not().isEmpty(),
    body('content', 'Content is required').not().isEmpty(),
    body('time_to_read', 'Time to read is required').not().isEmpty(),
    validateFields
  ],
  postController.createPost.bind(postController)
)

router.get('/', (req, res) =>
  postController.getRecentlyPublishedPosts(req, res)
)
router.get(
  '/my-posts',
  requireAuth,
  postController.getMyPosts.bind(postController)
)
router.delete(
  '/:id',
  requireAuth,
  postController.deletePostById.bind(postController)
)
router.get('/:id', checkToken, postController.getPostById.bind(postController))
router.put(
  '/:id',
  requireAuth,
  upload.single('file'),
  postController.editPost.bind(postController)
)
router.put(
  '/toggle-status/:id',
  requireAuth,
  postController.togglePublicationStatus.bind(postController)
)
router.get(
  '/by-username/:username',
  checkToken,
  postController.getPostsByUsername.bind(postController)
)

router.post(
  '/:id/comments',
  requireAuth,
  postController.createComment.bind(postController)
)

export { router as postRouter }
