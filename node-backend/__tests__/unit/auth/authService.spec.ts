import { AuthServiceImpl } from '../../../src/auth/authServiceImpl'
import { UserModel } from '../../../src/user/userModel'
import { JWTService } from '../../../src/auth/jwt/JWTService'
import { EmailService } from '../../../src/shared/email/EmailService'
import { PasswordEncoder } from '../../../src/auth/passwordEncoder/PasswordEncoder'
import { UserService } from '../../../src/user/userService'
import { UserNotFound } from '../../../src/user/errors/UserNotFound'
import {
  emailServiceMockShared,
  jwtServiceMockShared,
  passwordEncoderMockShared
} from '../shared'
import { EmailAlreadyExists } from '../../../src/auth/errors/EmailAlreadyExists'
import { UsernameAlreadyExists } from '../../../src/auth/errors/UsernameAlreadyExists'

jest.mock('../../../src/user/userService')

let jwtServiceMock: JWTService
let passwordEncoderMock: PasswordEncoder
let emailServiceMock: EmailService
let userServiceMock: UserService
let authService: AuthServiceImpl

beforeEach(async () => {
  jest.resetAllMocks()
  jwtServiceMock = jwtServiceMockShared
  passwordEncoderMock = passwordEncoderMockShared
  emailServiceMock = emailServiceMockShared

  const mockUser = {
    id: '1',
    email: 'XXXXXXXXXXXXXXX',
    username: 'XXXXXXXXXXXXXXX',
    password: 'XXXXXXXXXXXXXXX',
    createdAt: 'XXXXXXXXXXXXXXX',
    updatedAt: 'XXXXXXXXXXXXXXX'
  }

  userServiceMock = {
    userProfile: jest.fn(async (id) => {
      return mockUser
    }),
    editProfile: jest.fn(async (currentUser, id, newUser) => {
      return mockUser
    }),
    getUserByUsername: jest.fn(async (username) => {
      return mockUser
    }),
    getUserByEmail: jest.fn(async (email) => {
      return mockUser
    }),
    getUserById: jest.fn(async (id) => {
      return mockUser
    }),
    addFavoritePost: jest.fn(async (userId, postId) => {}),
    deleteFavoritePost: jest.fn(async (userId, postId) => {}),
    isPostMarkedAsFavorite: jest.fn(async (userId, postId) => {
      return true
    }),
    getFavoritePostsByUser: jest.fn(async (userId) => {
      return []
    })
  }

  authService = new AuthServiceImpl(
    jwtServiceMock,
    passwordEncoderMock,
    emailServiceMock,
    userServiceMock
  )
})

describe('register user tests', () => {
  it('should register user', async () => {
    const mockUser = {
      id: '1',
      email: 'XXXXXXXXXXXXXXX@ggmail.com',
      username: 'XXXXXXXXXXXXXXX',
      password: 'XXXXXXXXXXXXXXX',
      createdAt: 'XXXXXXXXXXXXXXX',
      updatedAt: 'XXXXXXXXXXXXXXX'
    }

    userServiceMock.getUserByEmail = jest.fn(async () => {
      return undefined
    })

    userServiceMock.getUserByUsername = jest.fn(async () => {
      return undefined
    })

    const createSpy = jest
      .spyOn(UserModel, 'create')
      .mockReturnValueOnce(mockUser as any)

    await authService.registerUser(mockUser)

    expect(createSpy).toBeCalled()
    expect(userServiceMock.getUserByEmail).toBeCalled()
    expect(userServiceMock.getUserByUsername).toBeCalled()
    expect(passwordEncoderMock.encode).toBeCalled()
    createSpy.mockRestore()
  })
  it('should throw EmailAlreadyExists when email already exists', async () => {
    const mockUser = {
      id: '1',
      email: 'XXXXXXXXXXXXXXX@ggmail.com',
      username: 'XXXXXXXXXXXXXXX',
      password: 'XXXXXXXXXXXXXXX',
      createdAt: 'XXXXXXXXXXXXXXX',
      updatedAt: 'XXXXXXXXXXXXXXX'
    }
    await expect(authService.registerUser(mockUser)).rejects.toThrow(
      EmailAlreadyExists
    )
    expect(passwordEncoderMock.encode).not.toBeCalled()
  })
  it('should throw UsernameAlreadyExists when username already exists', async () => {
    const mockUser = {
      id: '1',
      email: 'XXXXXXXXXXXXXXX@ggmail.com',
      username: 'XXXXXXXXXXXXXXX',
      password: 'XXXXXXXXXXXXXXX',
      createdAt: 'XXXXXXXXXXXXXXX',
      updatedAt: 'XXXXXXXXXXXXXXX'
    }
    userServiceMock.getUserByEmail = jest.fn(async () => {
      return undefined
    })
    await expect(authService.registerUser(mockUser)).rejects.toThrow(
      UsernameAlreadyExists
    )
  })
})

describe('recoverPassword tests', () => {
  it('should send recovery email', async () => {
    await authService.recoverPassword('dammian@gmail.com')
    expect(userServiceMock.getUserByEmail).toBeCalled()
    expect(emailServiceMock.sendEmail).toBeCalled()
    expect(jwtServiceMock.generateToken).toBeCalled()
  })
  it('should throw UserNotFound when user not exists', async () => {
    userServiceMock.getUserByEmail = jest.fn(async () => {
      return undefined
    })

    await expect(
      authService.recoverPassword('XXXXXXXXXXXXXXXXX')
    ).rejects.toThrow(UserNotFound)
    expect(emailServiceMock.sendEmail).not.toBeCalled()
    expect(jwtServiceMock.generateToken).not.toBeCalled()
  })
})
