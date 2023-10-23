import { JWTService } from '../../src/auth/jwt/JWTService'
import { PasswordEncoder } from '../../src/auth/passwordEncoder/PasswordEncoder'
import { EmailService } from '../../src/shared/email/EmailService'
import { ImageService } from '../../src/shared/image/ImageService'

export let jwtServiceMockShared: JWTService = {
  generateToken: jest.fn((payload, expiresIn) => {
    return 'token'
  }),
  verifyToken: jest.fn((token) => {
    return {
      id: '1',
      email: 'email@gmail.com'
    }
  })
}

export let passwordEncoderMockShared: PasswordEncoder = {
  encode: jest.fn((password) => {
    return 'password'
  }),
  matches: jest.fn((password, hashedPassword) => {
    return true
  })
}

export let emailServiceMockShared: EmailService = {
  sendEmail: jest.fn(async (email, subject, message) => {})
}

export let imageServiceMockShared: ImageService = {
  uploadImage: jest.fn(async (image) => {
    return {
      imageId: '1',
      url: 'imageURL'
    }
  }),
  deleteImage: jest.fn(async (image) => {}),
  getImageURL: jest.fn((image) => {
    return 'imageURL'
  })
}
