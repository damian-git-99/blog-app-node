import express from 'express';
import multer from 'multer';
import { requireAuth } from '../middlewares/requireAuth';
import { createPost } from './postController';
import { getRecentlyPublishedPosts } from './postController';
const router = express.Router();
const upload = multer();

router.post('/',
  [requireAuth, upload.single('file')],
  createPost);

router.get('/', getRecentlyPublishedPosts );

export {
  router as postRouter
}