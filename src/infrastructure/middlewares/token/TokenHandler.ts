import { CustomError } from "../../../application/erros/CustomError";
import { CheckRevokedTokenHandler } from "./handlers/CheckRevokedTokenHandler";
import { UserHandler } from "./handlers/UserHandler";
import { VerifyDecodedTokenHandler } from "./handlers/VerifyDecodedTokenHandler";
import { VerifyTokenIsProvidedHandler } from "./handlers/VerifyTokenIsProvidedHandler";
import { Request, Response, NextFunction } from 'express';

export class TokenHandler {
    
    private readonly checkRevokedTokenHandler = new CheckRevokedTokenHandler();
    private readonly verifyDecodedTokenHandler = new VerifyDecodedTokenHandler();
    private readonly verifyTokenIsProvidedHandler = new VerifyTokenIsProvidedHandler();
    private readonly userHandler = new UserHandler();

    constructor() {
    }

    public async tokenHandler(request: Request, response: Response, next: NextFunction) {
        const token = request.headers.authorization?.split(' ')[1];

        this.verifyTokenIsProvidedHandler
            .setNextHandler(this.verifyDecodedTokenHandler)
            .setNextHandler(this.checkRevokedTokenHandler)
            .setNextHandler(this.userHandler);
        
        try {
            const contextHandler = await this.verifyTokenIsProvidedHandler.handle({ token });
            request.userIdPk = contextHandler!.userIdPk!;
            
            next();
        } catch (error) {
            console.error(error);
            const err = error as CustomError;
            response.status(err.statusCode ?? 500).json({ error: err.message });
        }
    }

}