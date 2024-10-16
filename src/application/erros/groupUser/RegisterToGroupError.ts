import { CustomError } from "../CustomError";

export class RegisterToGroupError extends CustomError {
    constructor(
        message: string = "Error ao registrar usuário no grupo",
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "RegisterToGroupError";
    }
}