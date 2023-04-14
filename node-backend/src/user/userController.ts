import { Request, Response } from 'express';
import * as userService from './userService'

//@route Get users/profile
export const userProfileController = async (req: Request, res: Response) => {
  const id = req.currentUser?.id!;
  const user = await userService.userProfile(id);
  res.status(200)
    .json({
      email: user.email,
      username: user.username,
      id: user.id
    })
}

//@route PUT users/profile/:id
export const editProfile = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const currentUser = req.currentUser!;
  const userId = req.params.id;
  await userService.editProfile(currentUser, userId, { username, email, password });
  res.status(200)
    .json('ok')
}