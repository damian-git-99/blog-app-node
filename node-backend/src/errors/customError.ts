export interface CustomResponse {
  message: string
  field?: string
}

export abstract class CustomError extends Error {
  abstract statusCode: number
  abstract message: string
}