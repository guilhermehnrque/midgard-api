import { GroupUserEntity } from "../../../../domain/entity/GroupUserEntity";
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
        await this.groupService.ensureGroupExists(groupIdPk);

        await this.isAlreadyGroupMember(userIdPk, groupIdPk);

        const groupUserEntity = await GroupUserEntity.fromData({
            groups_id: groupIdPk,
            users_id: userIdPk
        });

        await this.groupUserService.registerUserToGroup([groupUserEntity]);
    }

    private async isAlreadyGroupMember(userIdPk: number, groupIdPk: number): Promise<void> {
        const groupUser = await this.groupUserService.getGroupUsersByGroupIdAndUserIdPk(userIdPk, groupIdPk);

        if (groupUser != null) {
            console.error(`[JoinGroupUseCase] -> User already in group`);
            throw new UserAlreadyInGroupError();
        }

    }

}