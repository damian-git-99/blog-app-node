import { CustomError } from "../../errors/customError";

export class BadCredential extends CustomError {
  statusCode: number;
  message: string;

  constructor(){
    super();
    this.message = 'Email or Password incorrect';
    this.statusCode = 401;
  }

}