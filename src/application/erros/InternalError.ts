import { CustomError } from "./CustomError";

export class InternalError extends CustomError {
    constructor(
        message: string = "Internal error occurred",
        public statusCode: number = 500
    ) {
        super(message, statusCode);
        this.name = "InternalError";
    }
}