import { getUserByUsername } from '../user/userService'
import { Post, PostModel } from './PostModel'
import { InvalidOperation } from './errors/InvalidOperation'
import { PostNotFound } from './errors/PostNotFound'
import { CurrentUser } from '../types/express/index'
import { UserNotFound } from '../user/errors/UserNotFound'
import { Types } from 'mongoose'
import { replaceEmptyFields } from '../shared/utils'
import { logger } from '../config/logger'
import Container from 'typedi'
import { ImageService } from '../shared/image/ImageService'

const imageService = Container.get<ImageService>('imageService')

export const cratePost = async (
  userId: string,
  post: Post,
  file: Express.Multer.File | undefined
) => {
  let imageName = ''
  if (file) {
    const response = await imageService.uploadImage(file)
    imageName = response?.imageId!
  }
  logger.info(`Post created successfully for user: ${userId}`)
  await PostModel.create({ ...post, image: imageName, user: userId })
}

export const editPost = async (
  postId: string,
  newPost: Post,
  file: Express.Multer.File | undefined,
  currentUser: CurrentUser
) => {
  const post = await PostModel.findById(postId)

  if (!post) {
    throw new PostNotFound(postId)
  }

  if (post.user.toString() !== currentUser.id) {
    throw new InvalidOperation('Invalid action: Unauthorized user')
  }

  let imageName = post.image
  if (file) {
    await deletePreviousImage(post)
    const response = await imageService.uploadImage(file)
    imageName = response?.imageId
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
    .select('title category time_to_read summary image createdAt')
    .populate('user', 'email username')
  return posts.map((post) => {
    if (post.image && post.image !== '') {
      post.image = imageService.getImageURL(post.image)
      return post
    }
    return post
  })
}

export const getMyPostsById = (userId: string) => {
  logger.info(`Searching posts for user with id ${userId}`)
  return PostModel.find({ user: userId }).select('title category isPublish')
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
    .select('title category time_to_read summary image createdAt isPublish')
    .populate('user', 'email username')

  return posts.map((post) => {
    if (post.image && post.image !== '') {
      post.image = imageService.getImageURL(post.image)
      return post
    }
    return post
  })
}

export const deletePostById = async (postId: string, userId: string) => {
  logger.info(`Deleting post with id ${postId}`)
  const post = await PostModel.findById(postId)
  if (!post) {
    throw new PostNotFound(postId)
  }
  if (post?.user.toString() != userId) {
    // check if post belongs to the authenticated user
    throw new InvalidOperation('Invalid action: Unauthorized user')
  }
  if (post?.image && post?.image != '') {
    logger.info('Deleting image for post being deleted successfully')
    await imageService.deleteImage(post.image)
  }
  await PostModel.findByIdAndDelete(postId)
  logger.info(`Post with id ${postId} has been deleted successfully`)
}

export const getPostById = async (
  postId: string,
  currentUser?: CurrentUser
) => {
  logger.info(`Searching for post by ID ${postId}`)
  const post = await PostModel.findById(postId).populate('user', 'username')

  if (!post) {
    throw new PostNotFound(postId)
  }

  if (!post.isPublish) {
    await checkPostUnpublishedAccess(post, currentUser)
  }

  if (post.image && post.image !== '') {
    post.image = imageService.getImageURL(post.image)
    return post
  }

  return post
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
  if (post.user.toString() !== currentUser.id) {
    throw new InvalidOperation('Invalid action: Unauthorized user')
  }
  await PostModel.findByIdAndUpdate(postId, { isPublish: !post.isPublish })
  logger.info(
    `Publication status for post with id ${postId} has been toggled successfully`
  )
}

const checkPostUnpublishedAccess = async (
  post: Post,
  currentUser?: CurrentUser
) => {
  // Check if the current user is the owner of the post
  logger.info(`Checking access to unpublished post`)
  if (currentUser?.id === post.user._id.toString()) {
    logger.info(
      `Current user ${currentUser.email} is the owner of the post ${post.title} and has access to it`
    )
    return true
  }
  throw new InvalidOperation('Invalid action: Unauthorized user')
}

const deletePreviousImage = async (post: Post) => {
  if (post.image && post.image !== '') {
    logger.info(
      `Deleting previous image for post and image filename ${post.image}`
    )
    imageService.deleteImage(post.image)
  }
}
