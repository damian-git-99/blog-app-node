import { deleteImage, getImageUrl, uploadImage } from '../file/cloudinaryService';
import { Post, PostModel } from './PostModel';
import { InvalidOperation } from './errors/InvalidOperation';
import { PostNotFound } from './errors/PostNotFound';
import { CurrentUser } from '../types/express/index';

export const cratePost = async (userId: string, post: Post, file: Express.Multer.File | undefined) => {
  let imageName = '';
  if (file) {
    const response = await uploadImage(file);
    imageName = response?.public_id!;
  }
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
    await deletePreviousImage(file, post)
    const response = await uploadImage(file)
    imageName = response?.public_id!
  }

  return PostModel.findByIdAndUpdate(postId, {
    ...newPost,
    image: imageName,
    time_to_read: newPost.time_to_read
  })
}

export const getRecentlyPublishedPosts = async () => {
  const posts = await PostModel.find({ isPublish: true })
    .select('title category time_to_read summary image createdAt')
    .populate('user', 'email');
  
  return posts.map(post => {
    if (post.image && post.image !== ''){
      post.image = getImageUrl(post.image)
      return post;
    }
    return post;
  })
}

export const getMyPostsById = (userId: string) => {
  return PostModel.find({ user: userId })
    .select('title category isPublish');
}  

export const deletePostById = async (postId: string, userId: string) => {
  const post = await PostModel.findById(postId);
  if (!post) {
    throw new PostNotFound(postId);
  }
  if (post?.user.toString() != userId) {
    // check if post belongs to the authenticated user
    throw new InvalidOperation('Invalid action: Unauthorized user');
  }
  if (post?.image && post?.image != '') {
    await deleteImage(post.image);
  }
  await PostModel.findByIdAndDelete(postId);
}

export const getPostById = async (postId: string, currentUser?: CurrentUser) => {
  const post = await PostModel.findById(postId);

  if (!post){
    throw new PostNotFound(postId);
  }

  if (!post.isPublish) {
    await checkPostUnpublishedAccess(post, currentUser);
  }
  
  if (post.image && post.image !== ''){
    post.image = getImageUrl(post.image)
    return post;
  }

  return post;
}

export const togglePublicationStatus = async (postId: string, currentUser: CurrentUser) => {
  const post = await PostModel.findById(postId);
  if (!post) {
    throw new PostNotFound(postId);
  }
  if (post.user.toString() !== currentUser.id) {
    throw new InvalidOperation('Invalid action: Unauthorized user');
  }
  await PostModel.findByIdAndUpdate(postId, { isPublish: !post.isPublish });
}

const checkPostUnpublishedAccess = async (post: Post, currentUser?: CurrentUser) => {
  // Check if the current user is the owner of the post
  if (currentUser?.id === post.user.toString()) {
    return;
  }
  throw new InvalidOperation('Invalid action: Unauthorized user');
}

const deletePreviousImage = async (file: Express.Multer.File, post: Post) => {
  if (post.image && post.image !== ''){
    deleteImage(post.image);
  }
}