import express from 'express';
import multer from 'multer';
import { requireAuth } from '../middlewares/requireAuth';
import { checkToken } from '../middlewares/checkToken';
import * as postController from './postController';

const router = express.Router();
const upload = multer();

router.post('/',
  [requireAuth, upload.single('file')],
  postController.createPost);

router.get('/', postController.getRecentlyPublishedPosts );
router.get('/my-posts', requireAuth, postController.getMyPosts );
router.delete('/:id', requireAuth, postController.deletePostById );
router.get('/:id', checkToken, postController.getPostById );
router.put('/:id', requireAuth, upload.single('file'), postController.editPost );
router.put('/toggle-status/:id', requireAuth, postController.togglePublicationStatus );
router.get('/by-username/:username', checkToken, postController.getPostsByUsername );

export {
  router as postRouter
} 