import { uploadImage } from '../file/fileService';
import { Post, PostModel } from './PostModel';

export const cratePost = async (userId: string, post: Post, file: Express.Multer.File | undefined) => {
  let imageName = ''
  if (file) {
    const response = await uploadImage(file);
    imageName = response?.secure_url!;
  }
  await PostModel.create({ ...post, image: imageName, user: userId })
}

export const getRecentlyPublishedPosts = () => {
  return PostModel.find({ isPublish: true })
    .select('title category time_to_read summary image')
    .populate('user', 'email');
}

export const getMyPostsById = (userId: string) => {
  return PostModel.find({ user: userId })
    .select('title category isPublish');
}  