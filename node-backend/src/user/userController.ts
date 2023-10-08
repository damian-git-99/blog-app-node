import { Request, Response } from 'express'
import { Service } from 'typedi'
import { logger } from '../config/logger'
import { UserService } from './userService'

@Service()
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * @route Get users/profile
   */
  public async userProfileController(req: Request, res: Response) {
    const id = req.currentUser?.id!
    logger.info(`User ${id} Profile Request`)
    const user = await this.userService.userProfile(id)
    res.status(200).json({
      email: user.email,
      username: user.username,
      id: user.id
    })
  }

  /**
   * @route PUT users/profile/:id
   */
  public async editProfile(req: Request, res: Response) {
    const { username, email, password } = req.body
    const currentUser = req.currentUser!
    const userId = req.params.id
    logger.info(`User ${currentUser.id} Edit Profile Request`)
    await this.userService.editProfile(currentUser, userId, {
      username,
      email,
      password
    })
    res.status(200).json('ok')
  }

  /**
   * @route PUT users/add-favorite-post/:postId
   */
  public async addFavoritePost(req: Request, res: Response) {
    const userId = req.currentUser!.id
    logger.info(`User ${userId} Add Favorite Post Request`)
    await this.userService.addFavoritePost(userId, req.params.postId)
    res.status(200).json('ok')
  }

  /**
   * @route PUT users/delete-favorite-post/:postId
   */
  public async deleteFavoritePost(req: Request, res: Response) {
    const userId = req.currentUser!.id
    logger.info(`User ${userId} Delete Favorite Post Request`)
    await this.userService.deleteFavoritePost(userId, req.params.postId)
    res.status(200).json('ok')
  }

  /**
   * @route GET users/is-favorite-post/:postId
   * check if post is marked as favorite by authenticated user
   */
  public async isPostMarkedAsFavorite(req: Request, res: Response) {
    const userId = req.currentUser!.id
    const postId = req.params.postId
    logger.info(`User ${userId} Check Favorite Post Request`)
    const isMarked = await this.userService.isPostMarkedAsFavorite(
      userId,
      postId
    )
    res.status(200).json({
      isMarked
    })
  }

  /**
   * @route GET users/favorite-posts
   */
  public async getFavoritePostsByUser(req: Request, res: Response) {
    const userId = req.currentUser!.id
    logger.info(`User ${userId} Get Favorite Posts Request`)
    const posts = await this.userService.getFavoritePostsByUser(userId)
    res.status(200).json(posts)
  }
}
