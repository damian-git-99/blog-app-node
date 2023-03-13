import { Request, Response } from 'express';
import * as userService from './userService'

//@route Get users/profile
export const userProfileController = async (req: Request, res: Response) => {
  const id = req.currentUser?.id!;
  const user = await userService.userProfile(id);
  res.status(200)
    .json({
      email: user.email,
    })
}