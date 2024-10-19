import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { GroupsOutputDTO } from "../../../dto/player/group/GroupsOutputDTO";
import { GroupService } from "../../../services/GroupService";

export class GroupMembershipsUseCase {

    private readonly groupService: GroupService;

    constructor() {
        this.groupService = new GroupService();
    }

    public async execute(): Promise<GroupsOutputDTO[]> {
        const activeGroups = true;

        const groups = await this.getGroupsList(activeGroups)

        return groups.map(group => {
            return new GroupsOutputDTO(
                group.description,
                group.is_active,
                group.sport_type,
                group.visibility,
                group.id!
            );
        })
    }

    private async getGroupsList(status: boolean): Promise<GroupEntity[]> {
        return await this.groupService.getGroupsByStatus(status);
    }

}