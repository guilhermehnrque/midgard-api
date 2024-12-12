import { CustomError } from "../../../application/erros/CustomError";
import { CheckRevokedTokenHandler } from "./handlers/CheckRevokedTokenHandler";
import { VerifyDecodedTokenHandler } from "./handlers/VerifyDecodedTokenHandler";
import { VerifyTokenIsProvidedHandler } from "./handlers/VerifyTokenIsProvidedHandler";
import { Request, Response, NextFunction } from 'express';

export class TokenHandler {
    
    private readonly checkRevokedTokenHandler: CheckRevokedTokenHandler;
    private readonly verifyDecodedTokenHandler: VerifyDecodedTokenHandler;
    private readonly verifyTokenIsProvidedHandler: VerifyTokenIsProvidedHandler;

    constructor() {
        this.checkRevokedTokenHandler = new CheckRevokedTokenHandler();
        this.verifyDecodedTokenHandler = new VerifyDecodedTokenHandler();
        this.verifyTokenIsProvidedHandler = new VerifyTokenIsProvidedHandler();
    }

    public async tokenHandler(request: Request, response: Response, next: NextFunction) {
        const token = request.headers.authorization?.split(' ')[1];

        this.verifyTokenIsProvidedHandler
            .setNextHandler(this.verifyDecodedTokenHandler)
            .setNextHandler(this.checkRevokedTokenHandler);
        
        try {
            const userId = await this.verifyTokenIsProvidedHandler.handle({ token });
            request.headers.userId = userId;

            next();
        } catch (error) {
            const err = error as CustomError;
            response.status(err.statusCode).json({ error: err.message });
        }
    }

}