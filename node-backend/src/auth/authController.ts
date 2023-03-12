import { Request, Response } from 'express';

//@route Post /register
export const register = (req: Request, res: Response) => {
  console.log(req.body)
};

