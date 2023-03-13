import { CustomError } from "../../errors/customError";

export class UserNotFound extends CustomError {
  statusCode: number;
  message: string;

  constructor(){
    super();
    this.message = "User not found";
    this.statusCode = 404;
  }

}