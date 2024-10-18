import { CustomError } from "./CustomError";

export class EnumValidatorError extends CustomError {
    constructor(
        message: string = "Enum validator error occurred",
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "EnumValidatorError";
    }
}