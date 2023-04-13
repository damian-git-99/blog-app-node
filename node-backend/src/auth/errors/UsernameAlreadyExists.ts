import { CustomError } from "../../errors/customError";

export class UsernameAlreadyExists extends CustomError {
  message: string;
  statusCode: number;

  constructor(username: string) {
    super();
    this.message = `Username: ${username} already exists`;
    this.statusCode = 400;
  }

}