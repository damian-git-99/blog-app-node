import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../errors/customError'

interface MyError extends Error {
  status: number
}

export const errorHandler = (
  err: MyError,
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> => {
  
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .send({ error: err.message })
  }
  
  return res
      .status(500)
      .send({ error: err.message })
}