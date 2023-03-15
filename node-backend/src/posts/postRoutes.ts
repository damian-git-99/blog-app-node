import express from 'express';
import multer from 'multer';
import { requireAuth } from '../middlewares/requireAuth';
import { createPost } from './postController';
import { getPosts } from './postController';
const router = express.Router();
const upload = multer();

router.post('/',
  [requireAuth, upload.single('file')],
  createPost);

router.get('/', requireAuth, getPosts );

export {
  router as postRouter
}