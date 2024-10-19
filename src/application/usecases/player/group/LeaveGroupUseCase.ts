import { GroupUserEntity } from "../../../../domain/entity/GroupUserEntity";
import { UsertNotGroupMember } from "../../../erros/groupUser/UsertNotGroupMember";
import { GroupService } from "../../../services/GroupService";
import { GroupUserService } from "../../../services/GroupUserService";


export class LeaveGroupUseCase {

    private readonly groupService: GroupService;
    private readonly groupUserService: GroupUserService;

    constructor() {
        this.groupService = new GroupService();
        this.groupUserService = new GroupUserService();
    }

    public async execute(userIdPk: number, groupIdPk: number): Promise<void> {
        await this.groupService.ensureGroupExists(groupIdPk);

        await this.isGroupMember(userIdPk, groupIdPk);

        const groupUserEntity = await GroupUserEntity.fromData({
            groups_id: groupIdPk,
            users_id: userIdPk
        });

        await this.groupUserService.removeUserFromGroup(groupUserEntity);
    }

    private async isGroupMember(userIdPk: number, groupIdPk: number): Promise<void> {
        const groupUser = await this.groupUserService.getGroupUsersByGroupIdAndUserIdPk(userIdPk, groupIdPk);

        if (groupUser == null) {
            console.error(`[JoinGroupUseCase] -> User not in group`);
            throw new UsertNotGroupMember();
        }

    }

}