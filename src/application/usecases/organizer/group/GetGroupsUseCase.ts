import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { GroupOutputDTO } from "../../../dto/organizer/group/GroupOutputDTO";
import { GroupService } from "../../../services/GroupService";

export class GetGroupsUseCase {

    private readonly groupService: GroupService;

    constructor() {
        this.groupService = new GroupService();
    }

    public async execute(userIdPk: number): Promise<{ active: GroupOutputDTO[], inactive: GroupOutputDTO[] }> {
        const groups = await this.groupService.getOrganizerGroupsByUserIdPk(userIdPk);

        if (groups.length == 0) {
            return { active: [], inactive: [] };
        }

        return this.categorizeGroupsByStatus(groups);
    }

    private async categorizeGroupsByStatus(groups: GroupEntity[]): Promise<{ active: GroupOutputDTO[], inactive: GroupOutputDTO[] }> {
        const activeGroups = groups.filter(group => group.is_active);
        const inactiveGroups = groups.filter(group => !group.is_active);

        return {
            active: GroupOutputDTO.fromEntities(activeGroups),
            inactive: GroupOutputDTO.fromEntities(inactiveGroups)
        };

    }

}