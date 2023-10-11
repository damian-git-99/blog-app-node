import Mongoose from 'mongoose'
import { Inject, Service } from 'typedi'
import { CurrentUser } from '../types/express'
import { EditUser } from './dto/EditUser'
import { User, UserModel } from './userModel'
import { UserService } from './userService'
import { PasswordEncoder } from '../auth/passwordEncoder/PasswordEncoder'
import { logger } from '../config/logger'
import { UserNotFound } from './errors/UserNotFound'
import { InvalidOperation } from '../posts/errors/InvalidOperation'
import { ImageService } from '../shared/image/ImageService'
import { EmailAlreadyExists } from '../auth/errors/EmailAlreadyExists'
import { UsernameAlreadyExists } from '../auth/errors/UsernameAlreadyExists'
import { replaceEmptyFields } from '../shared/utils'

@Service('userService')
export class UserServiceImpl implements UserService {
  constructor(
    private passwordEncoder: PasswordEncoder,
    @Inject('imageService') private imageService: ImageService
  ) {}

  public async userProfile(id: string) {
    logger.info(`searching user profile with id: ${id}`)
    const user = await UserModel.findById(id)
    if (!user) {
      throw new UserNotFound()
    }
    return user
  }

  public async editProfile(
    currentUser: CurrentUser,
    id: string,
    newUser: EditUser
  ) {
    logger.info(`editing user profile with id: ${id}`)
    if (id !== currentUser.id) {
      throw new InvalidOperation('Invalid Operation')
    }

    const user = await UserModel.findById(id)

    if (!user) {
      throw new UserNotFound()
    }

    const email = newUser.email
    const username = newUser.username

    // check if new email is available
    if (email && email !== user.email) {
      const emailExists = await this.getUserByEmail(email)
      if (emailExists) throw new EmailAlreadyExists('Email already exists')
    }

    if (username && username !== user.username) {
      const usernameExists = await this.getUserByUsername(username)
      if (usernameExists)
        throw new UsernameAlreadyExists('Username already exists')
    }

    const password = newUser.password
      ? this.passwordEncoder.encode(newUser.password)
      : user.password

    const newValues = replaceEmptyFields(newUser, user)
    const userUpdated = await UserModel.findByIdAndUpdate(id, {
      ...newValues,
      password
    })
    return this.mapUser(userUpdated)
  }

  public async getUserByUsername(username: string) {
    logger.info(`searching user with username: ${username}`)
    const user = await UserModel.findOne({ username })
    return this.mapUser(user)
  }

  public async getUserByEmail(email: string) {
    logger.info(`searching user with email: ${email}`)
    const user = await UserModel.findOne({ email })
    return this.mapUser(user)
  }

  public async getUserById(id: string) {
    logger.info(`searching user with id: ${id}`)
    const user = await UserModel.findById(id)
    return this.mapUser(user)
  }

  public async addFavoritePost(userId: string, postId: string) {
    logger.info(
      `adding favorite post with id: ${postId} to user with id: ${userId}`
    )
    const objectId = new Mongoose.Types.ObjectId(postId)
    // addToSet -> This operator is used to add an element to the end of the array only if the element does not already exist in the array.
    // await user?.updateOne({ $addToSet: { favorites: objectId } })
    await UserModel.updateOne(
      { _id: userId },
      { $addToSet: { favorites: objectId } }
    )
  }

  public async deleteFavoritePost(userId: string, postId: string) {
    logger.info(
      `deleting favorite post with id: ${postId} from user with id: ${userId}`
    )
    const objectId = new Mongoose.Types.ObjectId(postId)
    // todo: check if post belongs to currentUser
    await UserModel.updateOne(
      { _id: userId },
      { $pull: { favorites: objectId } }
    )
  }

  public async isPostMarkedAsFavorite(userId: string, postId: string) {
    logger.info(
      `Checking if post with id: ${postId} is marked as favorite for user with id: ${userId}`
    )
    const user = await this.getUserById(userId)
    const objectId = new Mongoose.Types.ObjectId(postId)
    if (!user?.favorites) return false
    return user.favorites.includes(objectId)
  }

  public async getFavoritePostsByUser(userId: string) {
    logger.info(
      `searching user with id: ${userId} and getting their favorite posts`
    )
    const user = await UserModel.findById(userId)
      .populate('favorites')
      .sort({ createdAt: -1 })
    return user?.favorites?.map((post: any) => {
      // todo: change any to Post
      if (post.image && post.image !== '') {
        post.image = this.imageService.getImageURL(post.image)
        return post
      }
      return post
    })
  }

  private mapUser(userDocument: any): User | undefined {
    if (!userDocument) return undefined
    return {
      id: userDocument._id,
      username: userDocument.username,
      email: userDocument.email,
      password: userDocument.password,
      favorites: userDocument?.favorites
    } as User
  }
}
