import { BaseOrganizer } from "../types/BaseOrganizer";
import { BaseOrganizerHandler } from "../BaseOrganizerHandler";
import { PermissionError } from "../../../../application/erros/PermissionError";
import { GroupService } from "../../../../application/services/GroupService";

export class GroupHandler extends BaseOrganizerHandler {

    private readonly groupService: GroupService;

    constructor() {
        super();
        this.groupService = new GroupService();
    }

    public async handle(request: BaseOrganizer): Promise<BaseOrganizer | null> {
        const group = await this.groupService.getGroupById(request.groupId!);

        if (!group || group.getOwner() !== request.userId) {
            throw new PermissionError();
        }

        return super.handle(request);
    }
}

