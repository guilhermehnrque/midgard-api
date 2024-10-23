

import { PermissionError } from "../../../../erros/PermissionError";
import { AbstractHandler } from "../../../AbstractHandler";
import { OrganizerTypeAccess } from "../../../types/OrganizerTypeAccess";
import { GroupService } from "../../../../services/GroupService";

export class GroupOrganizerHandler extends AbstractHandler {

    private readonly groupService: GroupService;

    constructor() {
        super();
        this.groupService = new GroupService();
    }

    public async handle(request: OrganizerTypeAccess): Promise<void> {
        const group = await this.groupService.getGroupById(request.groupId!);
        
        if (!group || group.getGroupOwner() !== request.userId) {
            console.error(`[GroupOrganizerHandler] Access denied: User is not an organizer.`);
            throw new PermissionError("Access denied: User is not an organizer of the group.");
        }

        super.handle(request);
    }
}
