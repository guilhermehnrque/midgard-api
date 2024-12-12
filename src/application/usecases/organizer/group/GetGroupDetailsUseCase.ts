import { GroupOutputDTO } from "../../../dto/organizer/group/GroupOutputDTO";
import { GroupService } from "../../../services/GroupService";

export class GetGroupDetailsUseCase {

    private readonly groupService: GroupService;

    constructor() {
        this.groupService = new GroupService();
    }

    public async execute(groupId: number): Promise<GroupOutputDTO> {
        const group = await this.groupService.getGroupById(groupId);

        return GroupOutputDTO.fromEntity(group);
    }

}
