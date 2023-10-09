import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { ImageService, UploadImageResponse } from './ImageService'
import * as dotenv from 'dotenv'
import { logger } from '../../config/logger'
import { Service } from 'typedi'
import { isSupportedImageType } from './supportedImage'
dotenv.config()

cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret
})

@Service('imageService')
export class ImageCloudinaryService implements ImageService {
  async uploadImage(file: Express.Multer.File): Promise<UploadImageResponse> {
    try {
      if (!isSupportedImageType(file)) {
        logger.error(`Unsupported image type: ${file.mimetype}`)
        throw new Error('Unsupported image type')
      }
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
      return {
        imageId: result?.public_id
      }
    } catch (error) {
      logger.error(error)
      throw new Error('Server Error')
    }
  }

  async deleteImage(imageId: string): Promise<any> {
    try {
      const result = await cloudinary.api.delete_resources([imageId])
      logger.info(`Deleted image from Cloudinary: ${imageId}`)
      return result
    } catch (error) {
      logger.error(error)
      throw new Error('Server Error')
    }
  }

  getImageURL(imageId: string): string {
    try {
      const url = cloudinary.url(imageId)
      return url
    } catch (error) {
      logger.error(`Error getting image url: ${imageId} from Cloudinary`)
      throw new Error('Server Error')
    }
  }
}
