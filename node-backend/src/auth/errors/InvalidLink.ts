import { CustomError } from '../../errors/customError'

export class InvalidLink extends CustomError {
  message: string
  statusCode: number

  constructor() {
    super()
    this.message = `Invalid Link`
    this.statusCode = 400
  }
}
