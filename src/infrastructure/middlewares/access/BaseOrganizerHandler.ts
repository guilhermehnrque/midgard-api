import { BaseOrganizer } from "./types/BaseOrganizer";

export abstract class BaseOrganizerHandler {

    protected nexHandler: BaseOrganizerHandler | null = null;

    setNextHandler(handler: BaseOrganizerHandler): BaseOrganizerHandler {
        this.nexHandler = handler;
        return handler
    }

    async handle(request: BaseOrganizer): Promise<BaseOrganizer | null> {
        if (this.nexHandler) return this.nexHandler.handle(request);

        return null;
    }

}