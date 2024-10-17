import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { GroupOutputDTO } from "../../../dto/organizer/group/GroupOutputDTO";
import { GroupService } from "../../../services/GroupService";
import { UserService } from "../../../services/UserService";

export class GetGroupsUseCase {

    private readonly userService: UserService;
    private readonly groupService: GroupService;

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
    }

    async execute(userId: string): Promise<{ active: GroupOutputDTO[], inactive: GroupOutputDTO[] }> {
        const user = await this.userService.getUserByUserId(userId);

        const groups = await this.groupService.getOrganizerGroupsByUserIdPk(user.getUserIdPk());

        return this.categorizeGroupsByStatus(groups);
    }

    async categorizeGroupsByStatus(groups: GroupEntity[]): Promise<{ active: GroupOutputDTO[], inactive: GroupOutputDTO[] }> {
        const activeGroups = groups.filter(group => group.is_active);
        const inactiveGroups = groups.filter(group => !group.is_active);

        return {
            active: GroupOutputDTO.fromEntities(activeGroups),
            inactive: GroupOutputDTO.fromEntities(inactiveGroups)
        };

    }

}