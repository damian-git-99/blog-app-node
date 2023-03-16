import { v2 as cloudinary, UploadApiResponse, DeleteApiResponse } from 'cloudinary';
import mime from 'mime-types';
import * as dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret
});

export const isSupportedImageType = async (file: Express.Multer.File) => {
  const mimeType = mime.lookup(file.mimetype);
  return (mimeType === 'image/jpeg' || mimeType === 'image/png');
};

export const uploadImage = async (file: Express.Multer.File): Promise<UploadApiResponse | undefined> => {
  try {
    const result = await new Promise<UploadApiResponse | undefined>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'blog_app', }, function (error, result) {
          if (error) reject(error);
          resolve(result);
        })
        .end(file.buffer);
    });
    return result;
  } catch (error) {
    console.log('****** Cloudinary ERROR ******')
    console.log(error)
    throw new Error('Server Error');
  }
};

export const deleteImage = async (publicId: string) => {
  try {
    const result = await cloudinary.api.delete_resources([publicId]);
    return result;
  } catch (error) {
    console.error(error)
    throw error;
  }
};

export const getImageUrl = (publicId: string) => {
  const url = cloudinary.url(publicId)
  return url;
}