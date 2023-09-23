import express from 'express'
import multer from 'multer'
import { requireAuth } from '../middlewares/requireAuth'
import { checkToken } from '../middlewares/checkToken'
import * as postController from './postController'
import { body } from 'express-validator'
import { validateFields } from '../middlewares/expressValidator'

const router = express.Router()
const upload = multer()

router.post(
  '/posts',
  [requireAuth, upload.single('file')],
  [
    body('title', 'Title is required').not().isEmpty(),
    body('summary', 'Summary is required').not().isEmpty(),
    body('content', 'Content is required').not().isEmpty(),
    body('category', 'Category is required').not().isEmpty(),
    body('time_to_read', 'Time to read is required').not().isEmpty(),
    validateFields
  ],
  postController.createPost
)

router.get('/posts', postController.getRecentlyPublishedPosts)
router.get('/posts/my-posts', requireAuth, postController.getMyPosts)
router.delete('/posts/:id', requireAuth, postController.deletePostById)
router.get('/posts/:id', checkToken, postController.getPostById)
router.put(
  '/posts/:id',
  requireAuth,
  upload.single('file'),
  postController.editPost
)
router.put(
  '/posts/toggle-status/:id',
  requireAuth,
  postController.togglePublicationStatus
)
router.get(
  '/posts/by-username/:username',
  checkToken,
  postController.getPostsByUsername
)

router.post('/posts/:id/comments', requireAuth, postController.createComment)

export default router
