export interface UploadImageResponse {
  imageId?: string
  url?: string
}

export interface ImageService {
  uploadImage(file: Express.Multer.File): Promise<UploadImageResponse>
  deleteImage(imageId: string): Promise<any>
  /**
   * The function `getImageURL` takes an image ID or image name as input and returns the corresponding URL of the
   * @param {string} imageId - The `imageId` parameter is a string that represents the unique
   * identifier of an image.
   * @returns a string, which is the URL of the image with the given imageId.
   */
  getImageURL(imageId: string): string
}
