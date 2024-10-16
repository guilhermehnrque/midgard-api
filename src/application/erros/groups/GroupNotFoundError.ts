import { CustomError } from "../CustomError";

export class GroupNotFoundError extends CustomError {
    constructor(
        message: string = "Grupo não encontrado",
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "GroupNotFoundError";
    }
}