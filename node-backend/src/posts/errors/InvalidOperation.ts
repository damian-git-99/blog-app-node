import { CustomError } from "../../errors/customError";

export class InvalidOperation extends CustomError {
  statusCode: number;
  message: string;

  constructor(message: string){
    super();
    this.statusCode = 403;
    this.message = message;
  }

}