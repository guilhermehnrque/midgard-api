import { GroupUserEntity } from "../../../domain/entity/GroupUserEntity";
import { PermissionError } from "../../erros/PermissionError";
import { GroupUserService } from "../GroupUserService";

export class GroupMembershipAccessService {

    private readonly groupUserService: GroupUserService

    constructor() {
        this.groupUserService = new GroupUserService();
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

}