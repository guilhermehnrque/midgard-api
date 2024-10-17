import { CustomError } from "../CustomError";

export class UserAlreadyInGroupError extends CustomError {
    constructor(
        message: string = "Error ao registrar usuário no grupo",
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "UserAlreadyInGroupError";
    }
}