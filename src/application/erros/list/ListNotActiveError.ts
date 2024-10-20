import { CustomError } from "../CustomError";

export class ListNotActiveError extends CustomError {
    constructor(
        message: string = "List is not open for registration", 
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "ListNotActiveError";
    }
}