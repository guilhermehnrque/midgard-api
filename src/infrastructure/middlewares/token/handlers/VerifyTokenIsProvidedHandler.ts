import { CustomError } from "../../../../application/erros/CustomError";
import { AbstractTokenHandler } from "../AbstractTokenHandler";
import { TokenContextDomain } from "../domain/TokenContextDomain";

export class VerifyTokenIsProvidedHandler extends AbstractTokenHandler {

    constructor() {
        super();
    }

    async handle(context: TokenContextDomain): Promise<TokenContextDomain | null> {
        if (context.token == undefined || context.token == null) {
            throw new CustomError('Token not provided', 401);
        }

        return super.handle(context);
    }

}
