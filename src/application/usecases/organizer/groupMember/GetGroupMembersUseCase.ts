import { GroupMemberOutputDTO } from "../../../dto/organizer/groupMember/GroupMemberOutputDTO";
import { MemberOutputDTO } from "../../../dto/organizer/groupMember/MemberOutputDTO";
import { GroupService } from "../../../services/GroupService";
import { GroupUserService } from "../../../services/GroupUserService";
import { UserService } from "../../../services/UserService";

export class GetGroupMembersUseCase {

    private readonly userService: UserService;
    private readonly groupMemberService: GroupUserService;
    private readonly groupService: GroupService;

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
        this.groupMemberService = new GroupUserService();
    }

    public async execute(groupIdPk: number): Promise<GroupMemberOutputDTO> {
        const groupMembers = await this.groupMemberService.getGroupMembersByGroupId(groupIdPk);

        const users = await Promise.all(groupMembers.map(async groupMember => {
            const user = await this.userService.getUserByIdPk(groupMember.users_id);
            return new MemberOutputDTO(user.getUserIdPk(), user.getFullname());
        }));

        const group = await this.groupService.getGroupById(groupIdPk);

        return GroupMemberOutputDTO.fromEntity(group, users);
    }

}