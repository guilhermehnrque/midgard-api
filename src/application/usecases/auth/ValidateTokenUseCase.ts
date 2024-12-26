import { CheckRevokedTokenHandler } from "../../../infrastructure/middlewares/token/handlers/CheckRevokedTokenHandler";
import { UserHandler } from "../../../infrastructure/middlewares/token/handlers/UserHandler";
import { VerifyDecodedTokenHandler } from "../../../infrastructure/middlewares/token/handlers/VerifyDecodedTokenHandler";
import { VerifyTokenIsProvidedHandler } from "../../../infrastructure/middlewares/token/handlers/VerifyTokenIsProvidedHandler";
import { CustomError } from "../../erros/CustomError";

export class ValidateTokenUseCase {

    private readonly checkRevokedTokenHandler = new CheckRevokedTokenHandler();
    private readonly verifyDecodedTokenHandler = new VerifyDecodedTokenHandler();
    private readonly verifyTokenIsProvidedHandler = new VerifyTokenIsProvidedHandler();
    private readonly userHandler = new UserHandler();

    public async execute(token: string | undefined): Promise<boolean> {

        this.verifyTokenIsProvidedHandler
            .setNextHandler(this.verifyDecodedTokenHandler)
            .setNextHandler(this.checkRevokedTokenHandler)
            .setNextHandler(this.userHandler);

        if (token == null) return false;

        try {
            const contextHandler = await this.verifyTokenIsProvidedHandler.handle({ token });

            return contextHandler !== null
        } catch (error) {
            throw new CustomError('Invalid token', 401);
        }

    }

}