import { Request, Response } from 'express';
import * as authService from './authService'

//@route Post /register
export const register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  await authService.registerUser({ email, password, username });
  res.status(201).json({
    status: 201
  })
};

//@route Post /login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { token, email: userEmail, username } = await authService.login({ email, password });
  res.status(200)
    .cookie('token', token, { sameSite: 'none', secure: true, signed: false })
    .json({
      id: 'id',
      email: userEmail,
      username
    })
};

//@route Post /logout
export const logout = async (req: Request, res: Response) => {
  res.cookie('token', null, { sameSite: 'none', secure: true, signed: false })
    .json('ok');
};

