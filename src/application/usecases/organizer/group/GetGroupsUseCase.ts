import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { GroupOutputDTO } from "../../../dto/organizer/group/GroupOutputDTO";
import { GroupService } from "../../../services/GroupService";
import { UserService } from "../../../services/UserService";
import { OrganizerValidationService } from "../../../services/validation/OrganizerValidationService";

export class GetGroupsUseCase {

    private readonly userService: UserService;
    private readonly groupService: GroupService;
    private readonly organizerValidationService: OrganizerValidationService;

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
        this.organizerValidationService = new OrganizerValidationService();
    }

    async execute(userId: string): Promise<{ active: GroupOutputDTO[], inactive: GroupOutputDTO[] }> {
        const user = await this.userService.getUserByUserId(userId);

        await this.organizerValidationService.validationOrganizerIsGroupOwner(user, user.getUserIdPk());

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