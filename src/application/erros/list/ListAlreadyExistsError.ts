import { CustomError } from "../CustomError";

export class ListAlreadyExistsError extends CustomError {
    constructor(
        message: string = "List already exists", 
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "ListAlreadyExistsError";
    }
}