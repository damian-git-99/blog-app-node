import { CustomError } from "../../errors/customError";

export class PostNotFound extends CustomError {
  statusCode: number;
  message: string;

  constructor(postId: string){
    super();
    this.statusCode = 404;
    this.message = `Post Not found: ${postId}`;
  }

}