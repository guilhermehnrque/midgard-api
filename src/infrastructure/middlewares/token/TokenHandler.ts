import { CustomError } from "../../../application/erros/CustomError";
import { OrganizerHandler } from "./handlers/OrganizerHandler";
import { PlayerHandler } from "./handlers/PlayerHandler";
import { CheckRevokedTokenHandler } from "./handlers/CheckRevokedTokenHandler";
import { VerifyDecodedTokenHandler } from "./handlers/VerifyDecodedTokenHandler";
import { VerifyTokenIsProvidedHandler } from "./handlers/VerifyTokenIsProvidedHandler";
import { Request, Response, NextFunction } from 'express';

export class TokenHandler {
    
    private readonly checkRevokedTokenHandler: CheckRevokedTokenHandler;
    private readonly verifyDecodedTokenHandler: VerifyDecodedTokenHandler;
    private readonly verifyTokenIsProvidedHandler: VerifyTokenIsProvidedHandler;
    private readonly organizerHandler: OrganizerHandler
    private readonly playerHandler: PlayerHandler;

    constructor() {
        this.checkRevokedTokenHandler = new CheckRevokedTokenHandler();
        this.verifyDecodedTokenHandler = new VerifyDecodedTokenHandler();
        this.verifyTokenIsProvidedHandler = new VerifyTokenIsProvidedHandler();
        this.organizerHandler = new OrganizerHandler();
        this.playerHandler = new PlayerHandler();
    }

    public async organizerTokenHandler(request: Request, response: Response, next: NextFunction) {
        const token = request.headers.authorization?.split(' ')[1];

        this.verifyTokenIsProvidedHandler
            .setNextHandler(this.verifyDecodedTokenHandler)
            .setNextHandler(this.checkRevokedTokenHandler)
            .setNextHandler(this.organizerHandler);
        
        try {
            const userId = await this.verifyTokenIsProvidedHandler.handle({ token });
            request.userId = userId;

            next();
        } catch (error) {
            const err = error as CustomError;
            response.status(err.statusCode).json({ error: err.message });
        }
    }

    public async playerTokenHandler(request: Request, response: Response, next: NextFunction) {
        const token = request.headers.authorization?.split(' ')[1];

        this.verifyTokenIsProvidedHandler
            .setNextHandler(this.verifyDecodedTokenHandler)
            .setNextHandler(this.checkRevokedTokenHandler)
            .setNextHandler(this.playerHandler);
        
        try {
            const userId = await this.verifyTokenIsProvidedHandler.handle({ token });
            request.userIdPk = userId;

            next();
        } catch (error) {
            const err = error as CustomError;
            response.status(err.statusCode).json({ error: err.message });
        }
    }

}