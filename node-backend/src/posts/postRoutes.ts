import express from 'express';
import multer from 'multer';
import { requireAuth } from '../middlewares/requireAuth';
import { createPost, getMyPosts, deletePostById, getPostById } from './postController';
import { getRecentlyPublishedPosts } from './postController';
const router = express.Router();
const upload = multer();

router.post('/',
  [requireAuth, upload.single('file')],
  createPost);

router.get('/', getRecentlyPublishedPosts );
router.get('/my-posts', requireAuth, getMyPosts );
router.delete('/:id', requireAuth, deletePostById );
router.get('/:id', getPostById );

export {
  router as postRouter
} 