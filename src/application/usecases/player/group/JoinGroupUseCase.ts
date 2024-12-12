import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { GroupUserEntity } from "../../../../domain/entity/GroupUserEntity";
import { GroupNotFoundError } from "../../../erros/groups/GroupNotFoundError";
import { UserAlreadyInGroupError } from "../../../erros/groupUser/UserAlreadyInGroupError";
import { GroupService } from "../../../services/GroupService";
import { GroupUserService } from "../../../services/GroupUserService";

export class JoinGroupUseCase {

    private readonly groupService: GroupService;
    private readonly groupUserService: GroupUserService;

    constructor() {
        this.groupService = new GroupService();
        this.groupUserService = new GroupUserService();
    }

    public async execute(userIdPk: number, groupIdPk: number): Promise<void> {
        const group = await this.groupService.getGroupById(groupIdPk);
        await this.checkGroup(group);

        const groupUser = await this.groupUserService.getGroupUsersByGroupIdAndUserIdPk(userIdPk, groupIdPk);
        await this.checkAlreadyGroupMember(groupUser);

        const groupUserEntity = await GroupUserEntity.fromData({
            groups_id: groupIdPk,
            users_id: userIdPk
        });

        await this.groupUserService.includeUserToGroup([groupUserEntity]);
    }

    private async checkGroup(groupEntity: GroupEntity) {
        if (groupEntity != null) {
            return
        }

        throw new GroupNotFoundError();
    }

    private async checkAlreadyGroupMember(groupUser: GroupUserEntity): Promise<void> {
        if (groupUser == null) {
           return
        }

        throw new UserAlreadyInGroupError();
    }

}