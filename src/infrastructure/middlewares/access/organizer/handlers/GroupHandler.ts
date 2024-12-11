import { OrganizerDomain } from "../domain/OrganizerDomain";
import { PermissionError } from "../../../../../application/erros/PermissionError";
import { AbstractOrganizerHandler } from "../AbstractOrganizerHandler";
import { GroupOrganizerService } from "../../../../../application/services/GroupOrganizerService";

export class GroupHandler extends AbstractOrganizerHandler {

    private readonly groupOrganizerService = new GroupOrganizerService();

    constructor() {
        super();
    }

    public async handle(request: OrganizerDomain): Promise<OrganizerDomain | null> {
        const group = await this.groupOrganizerService.isGroupOrganizer(request.groupId!, request.userId!);

        if (!group) {
            throw new PermissionError();
        }

        return super.handle(request);
    }
}

