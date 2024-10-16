import { CustomError } from "../CustomError";

export class GuestNotFoundError extends CustomError {
    constructor(
        message: string = "Convidado não encontrado",
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "GuestNotFoundError";
    }
}