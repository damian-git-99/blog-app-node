import { Request, Response } from 'express'
import * as userService from './userService'

//@route Get users/profile
export const userProfileController = async (req: Request, res: Response) => {
  const id = req.currentUser?.id!
  const user = await userService.userProfile(id)
  res.status(200).json({
    email: user.email,
    username: user.username,
    id: user.id
  })
}

//@route PUT users/profile/:id
export const editProfile = async (req: Request, res: Response) => {
  const { username, email, password } = req.body
  const currentUser = req.currentUser!
  const userId = req.params.id
  await userService.editProfile(currentUser, userId, {
    username,
    email,
    password
  })
  res.status(200).json('ok')
}

//@route PUT users/add-favorite-post/:postId
export const addFavoritePost = async (req: Request, res: Response) => {
  const userId = req.currentUser!.id
  await userService.addFavoritePost(userId, req.params.postId)
  res.status(200).json('ok')
}

//@route PUT users/delete-favorite-post/:postId
export const deleteFavoritePost = async (req: Request, res: Response) => {
  const userId = req.currentUser!.id
  await userService.deleteFavoritePost(userId, req.params.postId)
  res.status(200).json('ok')
}

//@route GET users/is-favorite-post/:postId
//desc: check if post is marked as favorite by authenticated user
export const isPostMarkedAsFavorite = async (req: Request, res: Response) => {
  const userId = req.currentUser!.id
  const postId = req.params.postId
  const isMarked = await userService.isPostMarkedAsFavorite(userId, postId)
  res.status(200).json({
    isMarked
  })
}

//@route GET users/favorite-posts
export const getFavoritePostsByUser = async (req: Request, res: Response) => {
  const userId = req.currentUser!.id
  const posts = await userService.getFavoritePostsByUser(userId)
  res.status(200).json(posts)
}
