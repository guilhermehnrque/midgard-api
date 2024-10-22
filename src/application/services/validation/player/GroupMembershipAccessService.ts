import { GroupUserEntity } from "../../../../domain/entity/GroupUserEntity";
import { PermissionError } from "../../../erros/PermissionError";
import { GroupUserService } from "../../GroupUserService";
import { ListBaseService } from "../../ListBaseService";

export class GroupMembershipAccessService {

    private readonly groupUserService: GroupUserService
    private readonly listBaseService: ListBaseService

    constructor() {
        this.groupUserService = new GroupUserService();
        this.listBaseService = new ListBaseService();
    }

    public async validateAccess({ userId, groupId }: { userId: number, groupId?: number }): Promise<void> {
        const groupUser = await this.groupUserService.getGroupUsersByGroupIdAndUserIdPk(userId, groupId!);

        await this.accessManagement(groupUser);
    }

    private async accessManagement(groupEntity: GroupUserEntity): Promise<void> {
        await this.ensureGroupMembership(groupEntity);
    }

    private async ensureGroupMembership(groupEntity: GroupUserEntity): Promise<void> {
        if (!groupEntity || groupEntity == null) {
            console.error(`[GroupMembershipAccessService] ensureOrganizerIsGroupOwner -> Access denied`);
            throw new PermissionError("Access denied");
        }
    }

    public async validateListAccess({ userId, listId }: { userId: number, listId?: number }) {
        const list = await this.listBaseService.getList(listId!);
        const group = await this.groupUserService.getGroupUsersByGroupIdAndUserIdPk(userId, list.getGroupIdPk())

        await this.accessManagement(group);
    }

}