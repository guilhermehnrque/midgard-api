import { CustomError } from "../CustomError";

export class ScheduleAlreadyExistsError extends CustomError {
    constructor(
        message: string = "Agendamento já registrado", 
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "ScheduleAlreadyExistsError";
    }
}