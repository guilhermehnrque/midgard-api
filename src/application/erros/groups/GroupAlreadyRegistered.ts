import { CustomError } from "../CustomError";

export class GroupAlreadyExists extends CustomError {
    constructor(
        message: string = "Grupo já registrado no sistema",
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "GroupAlreadyExists";
    }
}