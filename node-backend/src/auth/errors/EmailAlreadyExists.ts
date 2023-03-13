import { CustomError } from "../../errors/customError";

export class EmailAlreadyExists extends CustomError {
  message: string;
  statusCode: number;

  constructor(email: string) {
    super();
    this.message = `Email: ${email} already exists`;
    this.statusCode = 400;
  }

}