import { CurrentUser } from '../types/express'
import { EditUser } from './dto/EditUser'
import { User } from './userModel'

export interface UserService {
  userProfile(id: string): Promise<User>
  editProfile(
    currentUser: CurrentUser,
    id: string,
    newUser: EditUser
  ): Promise<User | undefined>
  getUserByUsername(username: string): Promise<User | undefined>
  getUserByEmail(email: string): Promise<User | undefined>
  getUserById(id: string): Promise<User | undefined>
  addFavoritePost(userId: string, postId: string): Promise<void>
  deleteFavoritePost(userId: string, postId: string): Promise<void>
  isPostMarkedAsFavorite(userId: string, postId: string): Promise<boolean>
  getFavoritePostsByUser(userId: string): Promise<any[] | undefined> // Cambia 'any[]' al tipo adecuado si lo tienes definido
}
