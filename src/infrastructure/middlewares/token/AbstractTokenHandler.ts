import { TokenContextDomain } from "./domain/TokenContextDomain";

export abstract class AbstractTokenHandler {

    protected nexHandler: AbstractTokenHandler | null = null;

    setNextHandler(handler: AbstractTokenHandler): AbstractTokenHandler {
        this.nexHandler = handler;
        return handler
    }

    async handle(request: TokenContextDomain): Promise<TokenContextDomain | null> {
        if (this.nexHandler) return this.nexHandler.handle(request);

        return null;
    }

}
