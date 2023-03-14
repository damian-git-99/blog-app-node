import express from 'express';
import multer from 'multer';
import { requireAuth } from '../middlewares/requireAuth';
import { createPost } from './postController';
const router = express.Router();
const upload = multer();

router.post('/',
  [requireAuth, upload.single('file')],
  createPost);

export {
  router as postRouter
}