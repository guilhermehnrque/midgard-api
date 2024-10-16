import { CustomError } from "../CustomError";

export class LocalNotFoundError extends CustomError {
    constructor(
        message: string = "Local não encontrado na base de dados", 
        public statusCode: number = 422
    ) {
        super(message, statusCode);
        this.name = "LocalNotFoundError";
    }
}