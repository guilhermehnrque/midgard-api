import { GroupUserEntity } from "../../../../domain/entity/GroupUserEntity";
import { GroupUserService } from "../../../services/GroupUserService";

export class RemoveGroupMemberUseCase {

    private readonly groupUsersService: GroupUserService;

    constructor() {
        this.groupUsersService = new GroupUserService();
    }

    public async execute(groupIdPk: number, memberIdPK: number): Promise<void> {
        await this.validations(memberIdPK, groupIdPk);

        const member = await GroupUserEntity.fromData({
            groups_id: groupIdPk,
            users_id: memberIdPK,
        });

        await this.groupUsersService.removeUserFromGroup(member);
    }

    private async validations(memberIdPK: number, groupIdPk: number): Promise<void> {
        await this.groupUsersService.ensureUserIsInGroup(memberIdPK, groupIdPk)
    }

}