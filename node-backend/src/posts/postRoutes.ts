import express from 'express';
import multer from 'multer';
import { requireAuth } from '../middlewares/requireAuth';
import * as postController from './postController';
import { getRecentlyPublishedPosts } from './postController';
import { checkToken } from '../middlewares/checkToken';
const router = express.Router();
const upload = multer();

router.post('/',
  [requireAuth, upload.single('file')],
  postController.createPost);

router.get('/', getRecentlyPublishedPosts );
router.get('/my-posts', requireAuth, postController.getMyPosts );
router.delete('/:id', requireAuth, postController.deletePostById );
router.get('/:id', checkToken, postController. getPostById );

export {
  router as postRouter
} 