import { PermissionError } from "../../../../erros/PermissionError";
import { GroupService } from "../../../../services/GroupService";
import { ListBaseService } from "../../../../services/ListBaseService";
import { AbstractHandler } from "../../../AbstractHandler";
import { OrganizerTypeAccess } from "../../../types/OrganizerTypeAccess";

export class ListAccessHandler extends AbstractHandler {

    private readonly groupService: GroupService;
    private readonly listBaseService: ListBaseService;

    constructor() {
        super();
        this.groupService = new GroupService();
        this.listBaseService = new ListBaseService();
    }

    public async handle(request: OrganizerTypeAccess): Promise<void> {
        const list = await this.listBaseService.getList(request.listId!);
        const group = await this.groupService.getGroupById(list.getGroupIdPk());

        if (group.getGroupOwner() !== request.userId) {
            console.error(`[GroupOrganizerHandler] Access denied: User is not an organizer.`);
            throw new PermissionError("Access denied: User is not an organizer of the group.");
        }

        super.handle(request);
    }
}
