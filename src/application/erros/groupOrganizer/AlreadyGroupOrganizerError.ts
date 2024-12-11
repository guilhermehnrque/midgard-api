import { CustomError } from "../CustomError";

export class AlreadyGroupOrganizerError extends CustomError {
    constructor(
        message: string = "Error ao registrar organizador no grupo",
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "AlreadyGroupOrganizerError";
    }
}