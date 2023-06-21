import Mongoose, { Schema } from 'mongoose'
import { EmailAlreadyExists } from '../auth/errors/EmailAlreadyExists'
import { UsernameAlreadyExists } from '../auth/errors/UsernameAlreadyExists'
import { encryptPassword } from '../auth/passwordUtils'
import { InvalidOperation } from '../posts/errors/InvalidOperation'
import { CurrentUser } from '../types/express'
import { replaceEmptyFields } from '../utils/utils'
import { EditUser } from './dto/EditUser'
import { UserNotFound } from './errors/UserNotFound'
import { UserModel } from './userModel'

export const userProfile = async (id: string) => {
  const user = await UserModel.findById(id)
  if (!user) {
    throw new UserNotFound()
  }
  return user
}

export const editProfile = async (
  currentUser: CurrentUser,
  id: string,
  newUser: EditUser
) => {
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
    const emailExists = await getUserByEmail(email)
    if (emailExists) throw new EmailAlreadyExists('Email already exists')
  }

  if (username && username !== user.username) {
    const usernameExists = await getUserByUsername(username)
    if (usernameExists)
      throw new UsernameAlreadyExists('Username already exists')
  }

  const password = newUser.password
    ? encryptPassword(newUser.password)
    : user.password
  const newValues = replaceEmptyFields(newUser, user)
  return UserModel.findByIdAndUpdate(id, {
    ...newValues,
    password
  })
}

export const getUserByUsername = async (username: string) => {
  const user = await UserModel.findOne({ username })
  return user
}

export const getUserByEmail = (email: string) => {
  return UserModel.findOne({ email })
}

export const getUserById = (id: string) => {
  return UserModel.findById(id)
}

export const addFavoritePost = async (userId: string, postId: string) => {
  const user = await getUserById(userId)
  const objectId = new Mongoose.Types.ObjectId(postId)
  // addToSet -> This operator is used to add an element to the end of the array only if the element does not already exist in the array.
  await user?.updateOne({ $addToSet: { favorites: objectId } })
}

export const deleteFavoritePost = async (userId: string, postId: string) => {
  const user = await getUserById(userId)
  const objectId = new Mongoose.Types.ObjectId(postId)
  await user?.updateOne({ $pull: { favorites: objectId } })
}

export const isPostMarkedAsFavorite = async (
  userId: string,
  postId: string
) => {
  const user = await getUserById(userId)
  const objectId = new Mongoose.Types.ObjectId(postId)
  return user?.favorites?.includes(objectId)
}
