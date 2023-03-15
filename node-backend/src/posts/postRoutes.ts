import express from 'express';
import multer from 'multer';
import { requireAuth } from '../middlewares/requireAuth';
import { createPost, getMyPosts } from './postController';
import { getRecentlyPublishedPosts } from './postController';
const router = express.Router();
const upload = multer();

router.post('/',
  [requireAuth, upload.single('file')],
  createPost);

router.get('/', getRecentlyPublishedPosts );
router.get('/my-posts', requireAuth, getMyPosts );

export {
  router as postRouter
} 