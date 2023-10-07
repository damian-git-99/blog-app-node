import { Types } from 'mongoose'
import Container from 'typedi'
import { replaceEmptyFields } from '../shared/utils'
import { logger } from '../config/logger'
import { getUserByUsername } from '../user/userService'
import { UserNotFound } from '../user/errors/UserNotFound'
import { Post, PostModel } from './PostModel'
import { InvalidOperation } from './errors/InvalidOperation'
import { PostNotFound } from './errors/PostNotFound'
import { CurrentUser } from '../types/express/index'
import { ImageService } from '../shared/image/ImageService'

const imageService = Container.get<ImageService>('imageService')

export const createPost = async (
  currentUser: CurrentUser,
  post: Post,
  image?: Express.Multer.File
) => {
  const { id } = currentUser
  const imageName = await uploadImageIfPresent(image)
  await PostModel.create({ ...post, image: imageName, user: id })
  logger.info(`Post created successfully for user: ${id}`)
}

// todo: refactor mejorar el tema de los parametros
export const editPost = async (
  postId: string,
  newPost: Post,
  image: Express.Multer.File | undefined,
  currentUser: CurrentUser
) => {
  const post = await PostModel.findById(postId)

  if (!post) {
    throw new PostNotFound(postId)
  }

  if (!isPostOwnedByCurrentUser(post, currentUser.id)) {
    throw new InvalidOperation('Invalid action: Unauthorized user')
  }

  let imageName = post.image

  if (image) {
    await deletePreviousImage(post)
    imageName = await uploadImageIfPresent(image)
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

export const getRecentlyPublishedPosts = async () => {
  logger.info('searching recently published posts')
  const posts = await PostModel.find({ isPublish: true })
    .select('title time_to_read summary image createdAt categories')
    .populate('user', 'email username')
    .sort({ createdAt: -1 })
  return posts.map(updatePostImageIfNotEmpty)
}

export const getMyPostsById = (userId: string) => {
  logger.info(`Searching posts for user with id ${userId}`)
  return PostModel.find({ user: userId }).select('title categories isPublish')
}

export const getPostsByUsername = async (
  username: string,
  currentUser?: CurrentUser
) => {
  logger.info(`Searching for posts by username ${username}`)
  const user = await getUserByUsername(username)

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

  return posts.map(updatePostImageIfNotEmpty)
}

export const deletePostById = async (
  postId: string,
  currentUser: CurrentUser
) => {
  logger.info(`Deleting post with id ${postId}`)
  const post = await PostModel.findById(postId)
  if (!post) {
    throw new PostNotFound(postId)
  }

  if (!isPostOwnedByCurrentUser(post, currentUser.id)) {
    throw new InvalidOperation('Invalid action: Unauthorized user')
  }

  await deleteImageIfPresent(post)

  await PostModel.findByIdAndDelete(postId)
  logger.info(`Post with id ${postId} has been deleted successfully`)
}

export const getPostById = async (postId: string, currentUser: CurrentUser) => {
  logger.info(`Searching for post by ID ${postId}`)
  const post = await PostModel.findById(postId)
    .populate('user', 'username')
    .populate('comments.user', 'username')
    .populate('comments', 'message createdAt')

  if (!post) {
    throw new PostNotFound(postId)
  }

  if (!post.isPublish && !isPostOwnedByCurrentUser(post, currentUser?.id)) {
    throw new InvalidOperation('Invalid action: Unauthorized user')
  }

  return updatePostImageIfNotEmpty(post)
}

export const togglePublicationStatus = async (
  postId: string,
  currentUser: CurrentUser
) => {
  logger.info(`Toggling publication status for post with id ${postId}`)
  const post = await PostModel.findById(postId)
  if (!post) {
    throw new PostNotFound(postId)
  }

  if (!isPostOwnedByCurrentUser(post, currentUser.id)) {
    throw new InvalidOperation('Invalid action: Unauthorized user')
  }

  await PostModel.findByIdAndUpdate(postId, { isPublish: !post.isPublish })
  logger.info(
    `Publication status for post with id ${postId} has been toggled successfully`
  )
}

export const createComment = async (
  currentUser: CurrentUser,
  postId: string,
  message: string
) => {
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
 * The function updates the image of a post with the full image URL if the image is not empty.
 * @param {Post} post
 * @returns the updated post object.
 */
const updatePostImageIfNotEmpty = (post: Post) => {
  // Check if the post has a non-empty image and update it with the image full image URL.
  if (post.image && post.image !== '') {
    post.image = imageService.getImageURL(post.image)
  }
  return post
}

const isPostOwnedByCurrentUser = (post: Post, currentUser: string) => {
  const postUser = post.user
  return postUser.equals(currentUser)
}

async function uploadImageIfPresent(
  file?: Express.Multer.File
): Promise<string> {
  if (!file) {
    return ''
  }
  const response = await imageService.uploadImage(file)
  return response?.imageId || ''
}

const deletePreviousImage = async (post: Post) => {
  if (post.image && post.image !== '') {
    logger.info(
      `Deleting previous image for post and image filename ${post.image}`
    )
    imageService.deleteImage(post.image)
  }
}

async function deleteImageIfPresent(post: Post): Promise<void> {
  if (hasImage(post)) {
    logger.info('Deleting the image associated with the post being deleted.')
    await imageService.deleteImage(post.image!)
  }
}

function hasImage(post: Post): boolean {
  return post.image !== undefined && post.image !== ''
}
