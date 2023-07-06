import { CustomError } from '../../errors/customError'

export class InvalidLink extends CustomError {
  message: string
  statusCode: number

  constructor() {
    super()
    this.message = `The link is invalid or has expired`
    this.statusCode = 400
  }
}
