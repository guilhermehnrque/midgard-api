import { CustomError } from "./CustomError";

export class PermissionError extends CustomError {
    constructor(
        message: string = "You are not allowed to access this",
        public statusCode: number = 403
    ) {
        super(message, statusCode);
        this.name = "PermissionError";
    }
}