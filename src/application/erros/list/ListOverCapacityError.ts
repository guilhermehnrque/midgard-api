import { CustomError } from "../CustomError";

export class ListOverCapacityError extends CustomError {
    constructor(
        message: string = "List is over capacity", 
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "ListOverCapacityError";
    }
}