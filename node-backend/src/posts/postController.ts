import { Request, Response } from 'express';
import * as postService from './postService';

//@route POST posts/
export const createPost = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id!;
  await postService.cratePost(userId, {...req.body}, req.file);
  res.send('ok');
}

//@route GET posts/
export const getRecentlyPublishedPosts = async (req: Request, res: Response) => {
  const posts = await postService.getRecentlyPublishedPosts()
  res.json({
    posts
  });
}

//@route GET posts/my-posts
export const getMyPosts = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id!;
  const posts = await postService.getMyPostsById(userId);
  res.json({
    posts
  });
}

//@route DELETE posts/:id
export const deletePostById = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id!;
  const postId = req.params.id;
  const posts = await postService.deletePostById(postId, userId);
  res.json({
    posts
  });
}

//@route GET posts/:id
export const getPostById = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const post = await postService.getPostById(postId, req.currentUser)
  res.json(
    post
  )
}

//@route PUT posts/:id
export const editPost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  await postService.editPost(postId, req.body, req.currentUser!);
  res.send('ok');
}