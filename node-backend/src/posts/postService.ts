import { deleteImage, getImageUrl, uploadImage } from '../file/cloudinaryService';
import { Post, PostModel } from './PostModel';

export const cratePost = async (userId: string, post: Post, file: Express.Multer.File | undefined) => {
  let imageName = ''
  if (file) {
    const response = await uploadImage(file);
    imageName = response?.public_id!;
  }
  await PostModel.create({ ...post, image: imageName, user: userId })
}

export const getRecentlyPublishedPosts = async () => {
  const posts = await PostModel.find({ isPublish: true })
    .select('title category time_to_read summary image')
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
    // todo: throw exception
  }
  if (post?.user.toString() != userId) {
    // check if post belongs to the authenticated user
    // todo: throw exception 
  }
  if (post?.image && post?.image != '') {
    await deleteImage(post.image);
  }
  await PostModel.findByIdAndDelete(postId);
}

export const getPostById = async (postId: string) => {
  // todo check if post is unpublished -> only owner can access
  const post = await PostModel.findById(postId);

  if (!post){
    // todo specific throw exception
    throw new Error('')
  }

  if (post.image && post.image !== ''){
    post.image = getImageUrl(post.image)
    return post;
  }

  return post;
}