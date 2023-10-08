import { AuthService } from '../../../src/auth/authService'
import { JWTService } from '../../../src/auth/jwt/JWTService'
import { PasswordEncoderBcrypt } from '../../../src/auth/passwordEncoder/PasswordEncoderBcrypt'
import { EmailService } from '../../../src/shared/email/EmailService'
import { PasswordEncoder } from '../../../src/auth/passwordEncoder/PasswordEncoder'
import { UserService } from '../../../src/user/userService'
import { ImageService } from '../../../src/shared/image/ImageService'
// generateToken(payload: TokenPayload, expiresIn?: string | number): string
//   verifyToken(token: string): TokenPayload

jest.mock('../../../src/user/userService')

const UserServiceMock = UserService as jest.MockedClass<typeof UserService>

describe('AuthService', () => {
  it('should create a new token', async () => {
    const jwtServiceMock: JWTService = {
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

    const passwordEncoderMock: PasswordEncoder = {
      encode: jest.fn((password) => {
        return 'password'
      }),
      matches: jest.fn((password, hashedPassword) => {
        return true
      })
    }

    const emailServiceMock: EmailService = {
      sendEmail: jest.fn(async (email, subject, message) => {
        console.log(email, subject, message)
      })
    }

    // depedencia de userService
    const imageServiceMock: ImageService = {
      uploadImage: jest.fn(async (image) => {
        return {}
      }),
      deleteImage: jest.fn(async (imageId) => {}),
      getImageURL: jest.fn((imageId) => {
        return 'url'
      })
    }

    // todo: cada clase tiene que retornar algo controlado
    // todo: por ejemplo aqui no se como mockear esto ya que
    // todo: regresa un objeto de mongoose
    // todo: entonces tendria que tener una interfaz para regresar
    // todo: un User de esta manera esta todo mas controlado
    // UserServiceMock.prototype.getUserByEmail.mockReturnValue({

    // })

    const token = jwtServiceMock.generateToken({ email: '22', id: '2' }, '2')
    console.log(token)
    const payload = jwtServiceMock.verifyToken(token)
    console.log(payload)
    // expect(jwtServiceMock.generateToken).toBeCalled()
    const authService = new AuthService(
      jwtServiceMock,
      passwordEncoderMock,
      emailServiceMock,
      new UserServiceMock(passwordEncoderMock, imageServiceMock)
    )

    authService.recoverPassword('')
  })
})
