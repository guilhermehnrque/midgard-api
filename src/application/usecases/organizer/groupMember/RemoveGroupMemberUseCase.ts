import { GroupUserEntity } from "../../../../domain/entity/GroupUserEntity";
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

    public async execute(userId: string, groupIdPk: number, memberIdPK: number): Promise<void> {
        const user = await this.userService.getUserByUserId(userId);
        const group = await this.groupService.getGroupById(groupIdPk);

        await this.organizerValidationService.groupManagerAccess(user, group);

        await this.validations(memberIdPK, groupIdPk, user.getUserIdPk());

        const member = await GroupUserEntity.fromData({
            groups_id: groupIdPk,
            users_id: memberIdPK,
        });


        await this.groupUsersService.removeUserFromGroup(member);
    }

    private async validations(memberIdPK: number, groupIdPk: number, userIdPk: number): Promise<void> {
        await this.groupUsersService.ensureUserIsInGroup(memberIdPK, groupIdPk)
    }

}