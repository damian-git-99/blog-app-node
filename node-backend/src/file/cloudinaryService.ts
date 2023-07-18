import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import mime from 'mime-types'
import * as dotenv from 'dotenv'
import { logger } from '../config/logger'
dotenv.config()

cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret
})

/**
 * The function checks if the file is a supported image type (JPEG or PNG).
 * @param file - The `file` parameter is of type `Express.Multer.File`. It represents a file object
 * that is uploaded using the Multer middleware in an Express application.
 * @returns a boolean value indicating whether the file is a supported image type (JPEG or PNG).
 */
export const isSupportedImageType = async (file: Express.Multer.File) => {
  const mimeType = mime.lookup(file.mimetype)
  return mimeType === 'image/jpeg' || mimeType === 'image/png'
}

export const uploadImage = async (
  file: Express.Multer.File
): Promise<UploadApiResponse | undefined> => {
  try {
    const result = await new Promise<UploadApiResponse | undefined>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: 'blog_app' }, function (error, result) {
            if (error) reject(error)
            resolve(result)
          })
          .end(file.buffer)
      }
    )
    logger.info(`Uploaded image to Cloudinary: ${file.originalname}`)
    return result
  } catch (error) {
    logger.error(error)
    throw new Error('Server Error')
  }
}

export const deleteImage = async (publicId: string) => {
  try {
    const result = await cloudinary.api.delete_resources([publicId])
    logger.info(`Deleted image from Cloudinary: ${publicId}`)
    return result
  } catch (error) {
    logger.error(error)
    throw new Error('Server Error')
  }
}

/**
  Returns the Cloudinary URL for a given public ID.
  @param publicId - The public ID of the image.
  @returns The Cloudinary URL for the image.
*/
export const getImageUrl = (publicId: string) => {
  try {
    // logger.info('Getting image url: ' + publicId + ' from Cloudinary')
    const url = cloudinary.url(publicId)
    // logger.info('Got image url: ' + url + ' from Cloudinary')
    return url
  } catch (error) {
    logger.error(`Error getting image url: ${publicId} from Cloudinary`)
  }
}
