import { Request, Response } from 'express';
import * as authService from './authService'

//@route Post /register
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  await authService.registerUser({ email, password });
  res.status(201).json({
    status: 201
  })
};

