import { Types } from 'mongoose'
import { Service } from 'typedi'
import { replaceEmptyFields } from '../shared/utils'
import { logger } from '../config/logger'
import { UserNotFound } from '../user/errors/UserNotFound'
import { Post, PostModel } from './PostModel'
import { InvalidOperation } from './errors/InvalidOperation'
import { PostNotFound } from './errors/PostNotFound'
import { CurrentUser } from '../types/express/index'
import { ImageService } from '../shared/image/ImageService'
import { UserService } from '../user/userService'

@Service()
export class PostService {
  constructor(
    private imageService: ImageService,
    private userService: UserService
  ) {}
  public async createPost(
    currentUser: CurrentUser,
    post: Post,
    image?: Express.Multer.File
  ) {
    const { id } = currentUser
    const imageName = await this.uploadImageIfPresent(image)
    await PostModel.create({ ...post, image: imageName, user: id })
    logger.info(`Post created successfully for user: ${id}`)
  }

  public async editPost(
    postId: string,
    newPost: Post,
    image: Express.Multer.File | undefined,
    currentUser: CurrentUser
  ) {
    const post = await PostModel.findById(postId)

    if (!post) {
      throw new PostNotFound(postId)
    }

    if (!this.isPostOwnedByCurrentUser(post, currentUser.id)) {
      throw new InvalidOperation('Invalid action: Unauthorized user')
    }

    let imageName = post.image

    if (image) {
      await this.deletePreviousImage(post)
      imageName = await this.uploadImageIfPresent(image)
    }

    const newValues = replaceEmptyFields(newPost, post)

    const updatedPost = await PostModel.findByIdAndUpdate(postId, {
      ...newValues,
      image: imageName,
      time_to_read: newPost.time_to_read
    })

    logger.info(`Post edited successfully for user: ${currentUser.id}`)
    return updatedPost
  }

  public async getRecentlyPublishedPosts() {
    logger.info('searching recently published posts')
    const posts = await PostModel.find({ isPublish: true })
      .select('title time_to_read summary image createdAt categories')
      .populate('user', 'email username')
      .sort({ createdAt: -1 })
    return posts.map(this.updatePostImageIfNotEmpty)
  }

  public async getMyPostsById(userId: string) {
    logger.info(`Searching posts for user with id ${userId}`)
    return PostModel.find({ user: userId }).select('title categories isPublish')
  }

  public async getPostsByUsername(username: string, currentUser?: CurrentUser) {
    logger.info(`Searching for posts by username ${username}`)
    const user = await this.userService.getUserByUsername(username)

    if (!user) {
      throw new UserNotFound()
    }

    let query: { user: Types.ObjectId; isPublish?: boolean } = {
      user: user._id,
      isPublish: true
    }

    // todo: refactor improve readability
    if (currentUser?.id === user.id.toString()) {
      /*This code checks if the currentUser (authenticated user) is the same as the username parameter. 
      If they are the same, it means that all posts (published and unpublished) will be returned. 
      If they are not the same, it means that only published posts will be returned. 
    */
      logger.info(
        'Searching for all posts, given that authenticated user is the same as the username'
      )
      query = {
        user: user._id
      }
    }

    const posts = await PostModel.find(query)
      .select('title categories time_to_read summary image createdAt isPublish')
      .populate('user', 'email username')
      .sort({ createdAt: -1 })

    return posts.map(this.updatePostImageIfNotEmpty)
  }

  public async deletePostById(postId: string, currentUser: CurrentUser) {
    logger.info(`Deleting post with id ${postId}`)
    const post = await PostModel.findById(postId)
    if (!post) {
      throw new PostNotFound(postId)
    }

    if (!this.isPostOwnedByCurrentUser(post, currentUser.id)) {
      throw new InvalidOperation('Invalid action: Unauthorized user')
    }

    await this.deleteImageIfPresent(post)

    await PostModel.findByIdAndDelete(postId)
    logger.info(`Post with id ${postId} has been deleted successfully`)
  }

  public async getPostById(postId: string, currentUser: CurrentUser) {
    logger.info(`Searching for post by ID ${postId}`)
    const post = await PostModel.findById(postId)
      .populate('user', 'username')
      .populate('comments.user', 'username')
      .populate('comments', 'message createdAt')

    if (!post) {
      throw new PostNotFound(postId)
    }

    if (
      !post.isPublish &&
      !this.isPostOwnedByCurrentUser(post, currentUser?.id)
    ) {
      throw new InvalidOperation('Invalid action: Unauthorized user')
    }

    return this.updatePostImageIfNotEmpty(post)
  }

  public async togglePublicationStatus(
    postId: string,
    currentUser: CurrentUser
  ) {
    logger.info(`Toggling publication status for post with id ${postId}`)
    const post = await PostModel.findById(postId)
    if (!post) {
      throw new PostNotFound(postId)
    }

    if (!this.isPostOwnedByCurrentUser(post, currentUser.id)) {
      throw new InvalidOperation('Invalid action: Unauthorized user')
    }

    await PostModel.findByIdAndUpdate(postId, { isPublish: !post.isPublish })
    logger.info(
      `Publication status for post with id ${postId} has been toggled successfully`
    )
  }

  public async createComment(
    currentUser: CurrentUser,
    postId: string,
    message: string
  ) {
    const post = await PostModel.findById(postId)
    if (!post) throw new PostNotFound(postId)
    const newComment = {
      user: currentUser.id,
      message
    }
    await post.updateOne({ $addToSet: { comments: newComment } })
    logger.info(`Comment added successfully for post with id ${postId}`)
  }

  /**
   * The method updates the image of a post with the full image URL if the image is not empty.
   * @param {Post} post
   * @returns the updated post object.
   */
  private async updatePostImageIfNotEmpty(post: Post) {
    // Check if the post has a non-empty image and update it with the image full image URL.
    if (post.image && post.image !== '') {
      post.image = this.imageService.getImageURL(post.image)
    }
    return post
  }

  private isPostOwnedByCurrentUser(post: Post, currentUser: string) {
    const postUser = post.user
    return postUser.equals(currentUser)
  }

  private async uploadImageIfPresent(file?: Express.Multer.File) {
    if (!file) {
      return ''
    }
    const response = await this.imageService.uploadImage(file)
    return response?.imageId || ''
  }

  private async deletePreviousImage(post: Post) {
    if (post.image && post.image !== '') {
      logger.info(
        `Deleting previous image for post and image filename ${post.image}`
      )
      this.imageService.deleteImage(post.image)
    }
  }

  private async deleteImageIfPresent(post: Post) {
    if (this.hasImage(post)) {
      logger.info('Deleting the image associated with the post being deleted.')
      await this.imageService.deleteImage(post.image!)
    }
  }

  private hasImage(post: Post) {
    return post.image !== undefined && post.image !== ''
  }
}
