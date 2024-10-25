import { CustomError } from "./CustomError";

export class UserAlreadyExistsError extends CustomError {
    constructor(
        message: string = "Usuário já cadastrado", 
        public statusCode: number = 400
    ) {
        super(message);
        this.name = "UserAlreadyExistsError";
    }
}