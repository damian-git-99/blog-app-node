import mime from 'mime-types'

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
