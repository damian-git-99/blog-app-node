import { Request, Response } from 'express'
import * as postService from './postService'
import { logger } from '../config/logger'

//@route POST posts/
export const createPost = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id!
  logger.info(`Creating new post request from user ${userId}`)
  await postService.cratePost(userId, { ...req.body }, req.file)
  res.send('ok')
}

//@route GET posts/
export const getRecentlyPublishedPosts = async (
  req: Request,
  res: Response
) => {
  logger.info('Getting recently published posts request')
  const posts = await postService.getRecentlyPublishedPosts()
  res.json({
    posts
  })
}

//@route GET posts/my-posts
//returns all posts of the authenticated user
export const getMyPosts = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id!
  logger.info(`Getting posts request for user ${userId}`)
  const posts = await postService.getMyPostsById(userId)
  res.json({
    posts
  })
}

//@route DELETE posts/:id
export const deletePostById = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id!
  const postId = req.params.id
  logger.info(`Deleting post request post: ${postId} for user ${userId}`)
  const posts = await postService.deletePostById(postId, userId)
  res.json({
    posts
  })
}

//@route GET posts/:id
export const getPostById = async (req: Request, res: Response) => {
  const postId = req.params.id
  logger.info(`Getting post request: ${postId}`)
  const post = await postService.getPostById(postId, req.currentUser)
  res.json(post)
}

//@route PUT posts/:id
export const editPost = async (req: Request, res: Response) => {
  const postId = req.params.id
  logger.info(`Editing post request: ${postId}`)
  await postService.editPost(postId, req.body, req.file, req.currentUser!)
  res.send('ok')
}

//@route PUT posts/publication-status/:id
//change the status of a post: published -> not published, not published -> published
export const togglePublicationStatus = async (req: Request, res: Response) => {
  const postId = req.params.id
  logger.info(`Toggling publication status request for post ${postId}`)
  await postService.togglePublicationStatus(postId, req.currentUser!)
  res.send('ok')
}

//@route GET posts/by-username/:username
export const getPostsByUsername = async (req: Request, res: Response) => {
  const username = req.params.username
  logger.info(`Getting posts request for username ${username}`)
  const posts = await postService.getPostsByUsername(username, req.currentUser)
  res.json(posts)
}

//@route POST posts/:id/comments
export const createComment = async (req: Request, res: Response) => {
  const postId = req.params.id
  const message = req.body.message
  logger.info(`Creating comment request for post ${postId}`)
  await postService.createComment(req.currentUser!, postId, message)
  res.send('ok')
}
