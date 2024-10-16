export class UserAlreadyExistsError extends Error {
    constructor(
        message: string = "Usuário já cadastrado", 
        public statusCode: number = 400
    ) {
        super(message);
        this.name = "UserAlreadyExistsError";
    }
}