import { CustomError } from "./CustomError";

export class DatabaseError extends CustomError {
    constructor(message: string, public statusCode: number = 500) {
        super(message);
        this.name = 'DatabaseError';
    }
}
