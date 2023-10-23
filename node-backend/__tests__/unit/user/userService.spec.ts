import { PasswordEncoder } from '../../../src/auth/passwordEncoder/PasswordEncoder'
import { ImageService } from '../../../src/shared/image/ImageService'
import { imageServiceMockShared, passwordEncoderMockShared } from '../shared'
import { UserServiceImpl } from '../../../src/user/UserServiceImpl'

let passwordEncoderMock: PasswordEncoder
let imageServiceMock: ImageService
let userService: UserServiceImpl

beforeEach(() => {
  jest.resetAllMocks()
  passwordEncoderMock = passwordEncoderMockShared
  imageServiceMock = imageServiceMockShared
  userService = new UserServiceImpl(passwordEncoderMock, imageServiceMock)
})

describe('test', () => {
  it('', () => {
    expect(1).toBe(1)
  })
})
