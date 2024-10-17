import { GroupOutputDTO } from "../../dto/organizer/group/GroupOutputDTO";
import { OrganizerAccessService } from "../../services/validation/OrganizerAccessService";
import { CreateGroupUseCase } from "../../usecases/organizer/group/CreateGroupUseCase";
import { GetGroupDetailsUseCase } from "../../usecases/organizer/group/GetGroupDetailsUseCase";
import { GetGroupsUseCase } from "../../usecases/organizer/group/GetGroupsUseCase";
import { UpdateGroupUseCase } from "../../usecases/organizer/group/UpdateGroupUseCase";

export class GroupFacade {

    private readonly organizerAccessService: OrganizerAccessService;
    private readonly createGroupUseCase: CreateGroupUseCase;
    private readonly updateGroupUseCase: UpdateGroupUseCase;
    private readonly getGroupUseCase: GetGroupsUseCase;
    private readonly getGroupsUseCase: GetGroupDetailsUseCase;

    constructor() {
        this.organizerAccessService = new OrganizerAccessService();
        this.createGroupUseCase = new CreateGroupUseCase();
        this.updateGroupUseCase = new UpdateGroupUseCase();
        this.getGroupUseCase = new GetGroupsUseCase();
        this.getGroupsUseCase = new GetGroupDetailsUseCase();
    }

    async createGroup(request: any, userId: string): Promise<void> {
        const userIdPk = await this.organizerAccessService.validateAccess({ userId });

        const { description, visibility, sportType } = request;
        await this.createGroupUseCase.execute(userIdPk, description, visibility, sportType);
    }

    async updateGroup(request: any, userId: string, groupIdPk: number): Promise<void> {
        await this.organizerAccessService.validateAccess({ userId, groupId: groupIdPk });

        const { description, visibility, sportType, status } = request;
        await this.updateGroupUseCase.execute(groupIdPk, description, status, visibility, sportType);
    }

    async getGroup(userId: string, groupIdPk: number): Promise<{ active: GroupOutputDTO[], inactive: GroupOutputDTO[] }> {
        const userIdPk = await this.organizerAccessService.validateAccess({ userId, groupId: groupIdPk });

        return await this.getGroupUseCase.execute(userIdPk);
    }

    async getGroups(userId: string, groupIdPk: number): Promise<GroupOutputDTO> {
        await this.organizerAccessService.validateAccess({ userId });

        return await this.getGroupsUseCase.execute(groupIdPk);
    }

}