import { CustomError } from "../CustomError";

export class LimitOfPlayersError extends CustomError {
    constructor(
        message: string = "Limit of players has been reached", 
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "LimitOfPlayersError";
    }
}