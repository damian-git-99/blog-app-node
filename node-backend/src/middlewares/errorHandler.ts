import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../errors/customError'
import { logger } from '../config/logger'

interface MyError extends Error {
  status: number
}

export const errorHandler = (
  err: MyError,
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> => {
  logger.error(err.message)

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ error: err.message })
  }

  return res.status(500).send({ error: err.message })
}
