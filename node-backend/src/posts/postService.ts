import { uploadImage } from '../file/fileService';
import { Post, PostModel } from './PostModel';

export const cratePost = async (userId: string, post: Post, file: Express.Multer.File | undefined) => {
  let imageName = ''
  if (file) {
    const response = await uploadImage(file);
    imageName = response?.secure_url!;
  }
  // todo upload image to cloudinary
  await PostModel.create({ ...post, image: imageName, user: userId })
}