import { CustomError } from "./CustomError";

export class LoginError extends CustomError {
    constructor(
        message: string = "Usuário ou senha inválidos",
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "LoginError";
    }
}