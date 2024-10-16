import { CustomError } from "./CustomError";

export class InvalidUserTypeError extends CustomError {
    constructor(
        message: string = "Tipo de usuário inválido",
        public statusCode: number = 422
    ) {
        super(message, statusCode);
        this.name = "InvalidUserTypeError";
    }
}