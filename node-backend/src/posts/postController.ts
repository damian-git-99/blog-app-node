import { Request, Response } from 'express';
import * as postService from './postService';

//@route POST posts/
export const createPost = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id!;
  await postService.cratePost(userId, {...req.body}, req.file);
  res.send('ok');
}