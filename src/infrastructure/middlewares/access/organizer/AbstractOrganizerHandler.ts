import { OrganizerDomain } from "./types/OrganizerDomain";

export abstract class AbstractOrganizerHandler {

    protected nexHandler: AbstractOrganizerHandler | null = null;

    setNextHandler(handler: AbstractOrganizerHandler): AbstractOrganizerHandler {
        this.nexHandler = handler;
        return handler
    }

    async handle(request: OrganizerDomain): Promise<OrganizerDomain | null> {
        if (this.nexHandler) return this.nexHandler.handle(request);

        return null;
    }

}