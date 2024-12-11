import { OrganizerDomain } from "../domain/OrganizerDomain";
import { PermissionError } from "../../../../../application/erros/PermissionError";
import { GroupService } from "../../../../../application/services/GroupService";
import { AbstractOrganizerHandler } from "../AbstractOrganizerHandler";

export class GroupHandler extends AbstractOrganizerHandler {

    private readonly groupService: GroupService;

    constructor() {
        super();
        this.groupService = new GroupService();
    }

    public async handle(request: OrganizerDomain): Promise<OrganizerDomain | null> {
        const group = await this.groupService.getGroupById(request.groupId!);

        if (group.getOwner() !== request.userId) {
            throw new PermissionError();
        }

        return super.handle(request);
    }
}

