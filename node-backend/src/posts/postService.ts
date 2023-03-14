import { Post, PostModel } from './PostModel';

export const cratePost = async (userId: string, post: Post, file: Express.Multer.File | undefined) => {
  // todo generate image unique name
  const imageName = file?.originalname + '_id';
  // todo upload image to cloudinary
  await PostModel.create({ ...post, image: imageName, user: userId })
}