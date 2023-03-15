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

export const getPosts = () => {
  return PostModel.find({}).select('title category time_to_read summary image');
}