import { GroupOutputDTO } from "../../../dto/organizer/group/GroupOutputDTO";
import { GroupService } from "../../../services/GroupService";
import { UserService } from "../../../services/UserService";
import { OrganizerValidationService } from "../../../services/validation/OrganizerValidationService";

export class GetGroupDetailsUseCase {

    private readonly userService: UserService;
    private readonly groupService: GroupService;
    private readonly organizerValidationService: OrganizerValidationService;

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
        this.organizerValidationService = new OrganizerValidationService();
    }

    async execute(groupId: number, userIdPk: string): Promise<GroupOutputDTO> {
        const user = await this.userService.getUserByUserId(userIdPk);
        const group = await this.groupService.getGroupById(groupId);

        await this.organizerValidationService.groupManagerAccess(user, group);

        return GroupOutputDTO.fromEntity(group);
    }

}
