import { GroupUserEntity } from "../../../../domain/entity/GroupUserEntity";
import { AddMemberToGroupError } from "../../../erros/groupUser/AddMemberToGroupError";
import { GroupService } from "../../../services/GroupService";
import { GroupUserService } from "../../../services/GroupUserService";
import { UserService } from "../../../services/UserService";
import { OrganizerValidationService } from "../../../services/validation/OrganizerValidationService";

export class AddGroupMemberUseCase {

    private readonly userService: UserService;
    private readonly groupService: GroupService;
    private readonly groupUsersService: GroupUserService;
    private readonly organizerValidationService: OrganizerValidationService;

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
        this.groupUsersService = new GroupUserService();
        this.organizerValidationService = new OrganizerValidationService();
    }

    public async execute(userId: string, groupIdPk: number, membersId: Array<number>): Promise<void> {
        const user = await this.userService.getUserByUserId(userId);
        const group = await this.groupService.getGroupById(groupIdPk);

        await this.organizerValidationService.groupManagerAccess(user, group);

        await this.validations(membersId, groupIdPk, user.getUserIdPk());

        const members = await Promise.all(membersId.map(async membersId => await GroupUserEntity.fromData({
            groups_id: groupIdPk,
            users_id: membersId
        })));


        await this.groupUsersService.registerUserToGroup(members);
    }

    private async validations(membersId: Array<number>, groupIdPk: number, userIdPk: number): Promise<void> {

        if ((membersId.length <= 0)) {
            console.error(`[AddMemberToGroupUseCase] -> empty array of members`);
            throw new AddMemberToGroupError();
        }

        this.isUserAlreadyInGroup(membersId, groupIdPk);
    }

    private async isUserAlreadyInGroup(membersId: Array<number>, groupIdPk: number): Promise<void> {
        await Promise.all(membersId.map(async memberId => await this.groupUsersService.ensureUserIsNotInGroup(memberId, groupIdPk)));
    }

}