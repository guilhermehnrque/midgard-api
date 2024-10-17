import { CustomError } from "../CustomError";

export class LocalAlreadyExistsError extends CustomError {
    constructor(
        message: string = "Local já existented", 
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "LocalAlreadyExistsError";
    }
}