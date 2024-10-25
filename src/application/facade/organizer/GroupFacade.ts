import { UpdateGroupRequest } from "../../../infrastructure/requests/organizer/groups/UpdateGroupRequest";
import { CreateGroupRequest } from "../../../infrastructure/requests/organizer/groups/CreateGroupRequest";
import { GroupOutputDTO } from "../../dto/organizer/group/GroupOutputDTO";
import { CreateGroupUseCase } from "../../usecases/organizer/group/CreateGroupUseCase";
import { GetGroupDetailsUseCase } from "../../usecases/organizer/group/GetGroupDetailsUseCase";
import { GetGroupsUseCase } from "../../usecases/organizer/group/GetGroupsUseCase";
import { UpdateGroupUseCase } from "../../usecases/organizer/group/UpdateGroupUseCase";

export class GroupFacade {

    private readonly createGroupUseCase: CreateGroupUseCase;
    private readonly updateGroupUseCase: UpdateGroupUseCase;
    private readonly getGroupUseCase: GetGroupsUseCase;
    private readonly getGroupsUseCase: GetGroupDetailsUseCase;

    constructor() {
        this.createGroupUseCase = new CreateGroupUseCase();
        this.updateGroupUseCase = new UpdateGroupUseCase();
        this.getGroupUseCase = new GetGroupsUseCase();
        this.getGroupsUseCase = new GetGroupDetailsUseCase();

    }

    public async createGroup(request: CreateGroupRequest, userId: number): Promise<void> {
        const { description, visibility, sportType } = request;
        await this.createGroupUseCase.execute(userId, description, visibility, sportType);

    }

    public async updateGroup(request: UpdateGroupRequest, userId: number, groupIdPk: number): Promise<void> {
        const { description, visibility, sportType, status } = request;
        await this.updateGroupUseCase.execute(groupIdPk, description, status, visibility, sportType, userId);
    }

    public async getGroup(groupIdPk: number): Promise<GroupOutputDTO> {
        return await this.getGroupsUseCase.execute(groupIdPk);
    }

    public async getGroups(userId: number): Promise<{ active: GroupOutputDTO[], inactive: GroupOutputDTO[] }> {
        return await this.getGroupUseCase.execute(userId);
    }

}
