import { CustomError } from "./CustomError";

export class UserNotFoundError extends CustomError {
    constructor(
        message: string = "Usuário não encontrado",
        public statusCode: number = 404
    ) {
        super(message, statusCode);
        this.name = "UserNotFoundError";
    }
}