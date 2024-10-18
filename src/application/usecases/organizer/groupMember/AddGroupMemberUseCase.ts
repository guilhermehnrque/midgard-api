import { GroupUserEntity } from "../../../../domain/entity/GroupUserEntity";
import { AddMemberToGroupError } from "../../../erros/groupUser/AddMemberToGroupError";
import { GroupUserService } from "../../../services/GroupUserService";

export class AddGroupMemberUseCase {

    private readonly groupUsersService: GroupUserService;

    constructor() {
        this.groupUsersService = new GroupUserService();
    }

    public async execute(groupIdPk: number, membersId: Array<number>): Promise<void> {
        await this.validations(membersId, groupIdPk);

        const members = await Promise.all(membersId.map(async membersId => await GroupUserEntity.fromData({
            groups_id: groupIdPk,
            users_id: membersId
        })));


        await this.groupUsersService.registerUserToGroup(members);
    }

    private async validations(membersId: Array<number>, groupIdPk: number): Promise<void> {

        if ((membersId.length <= 0)) {
            console.error(`[AddMemberToGroupUseCase] -> empty array of members`);
            throw new AddMemberToGroupError();
        }

        await this.isUserAlreadyInGroup(membersId, groupIdPk);
    }

    private async isUserAlreadyInGroup(membersId: Array<number>, groupIdPk: number): Promise<void> {
        await Promise.all(membersId.map(async memberId => await this.groupUsersService.ensureUserIsNotInGroup(memberId, groupIdPk)));
    }

}