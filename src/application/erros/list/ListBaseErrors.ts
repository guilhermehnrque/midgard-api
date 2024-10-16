import { CustomError } from "../CustomError";

export class PlayerAlreadyInListError extends CustomError {
    constructor(
        message: string = "O jogador já está resgistrado na lista", 
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "PlayerAlreadyInListError";
    }
}

export class PlayerNotFoundInListError extends CustomError {
    constructor(
        message: string = "O jogador não está na lista", 
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "PlayerNotFoundInListError";
    }
}

export class ListNotFoundError extends CustomError {
    constructor(
        message: string = "Lista de jogadores não encontrada", 
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "ListNotFoundError";
    }
}