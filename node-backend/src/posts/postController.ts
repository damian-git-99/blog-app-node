import { Request, Response } from 'express'
import { logger } from '../config/logger'
import { PostService } from './postService'
import { Service } from 'typedi'

@Service()
export class PostController {
  constructor(private postService: PostService) {}

  /**
   * @route POST posts/
   */
  public async createPost(req: Request, res: Response) {
    const userId = req.currentUser?.id!
    logger.info(`Creating new post request from user ${userId}`)
    const categories = JSON.parse(req.body.categories)
    req.body.categories = categories
    await this.postService.createPost(
      req.currentUser!,
      { ...req.body },
      req.file
    )
    res.send('ok')
  }

  /**
   * @route GET posts/
   */
  public async getRecentlyPublishedPosts(req: Request, res: Response) {
    logger.info('Getting recently published posts request')
    const posts = await this.postService.getRecentlyPublishedPosts()
    res.json({ posts })
  }

  /**
   * @route GET posts/my-posts
   * returns all posts of the authenticated user
   */
  public async getMyPosts(req: Request, res: Response) {
    const userId = req.currentUser?.id!
    logger.info(`Getting posts request for user ${userId}`)
    const posts = await this.postService.getMyPostsById(userId)
    res.json({ posts })
  }

  /**
   * @route DELETE posts/:id
   */
  public async deletePostById(req: Request, res: Response) {
    const userId = req.currentUser?.id!
    const postId = req.params.id
    logger.info(`Deleting post request post: ${postId} for user ${userId}`)
    const posts = await this.postService.deletePostById(
      postId,
      req.currentUser!
    )
    res.json({ posts })
  }

  /**
   * @route GET posts/:id
   */
  public async getPostById(req: Request, res: Response) {
    const postId = req.params.id
    logger.info(`Getting post request: ${postId}`)
    const post = await this.postService.getPostById(postId, req.currentUser!)
    res.json(post)
  }

  /**
   * @route PUT posts/:id
   */
  public async editPost(req: Request, res: Response) {
    const postId = req.params.id
    logger.info(`Editing post request: ${postId}`)
    const categories = JSON.parse(req.body.categories)
    req.body.categories = categories
    await this.postService.editPost(
      postId,
      req.body,
      req.file,
      req.currentUser!
    )
    res.send('ok')
  }

  /**
   * @route PUT posts/publication-status/:id
   * Changes the status of a post: published -> not published, not published -> published.
   */
  public async togglePublicationStatus(req: Request, res: Response) {
    const postId = req.params.id
    logger.info(`Toggling publication status request for post ${postId}`)
    await this.postService.togglePublicationStatus(postId, req.currentUser!)
    res.send('ok')
  }

  /**
   * @route GET posts/by-username/:username
   */
  public async getPostsByUsername(req: Request, res: Response) {
    const username = req.params.username
    logger.info(`Getting posts request for username ${username}`)
    const posts = await this.postService.getPostsByUsername(
      username,
      req.currentUser
    )
    res.json(posts)
  }

  /**
   * @route POST posts/:id/comments
   */
  public async createComment(req: Request, res: Response) {
    const postId = req.params.id
    const message = req.body.message
    logger.info(`Creating comment request for post ${postId}`)
    await this.postService.createComment(req.currentUser!, postId, message)
    res.send('ok')
  }
}
