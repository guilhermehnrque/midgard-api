import { RegisterGroupMemberRequest } from "../../../infrastructure/requests/organizer/groupMember/RegisterGroupMemberRequest";
import { UpdateGroupMemberRequest } from "../../../infrastructure/requests/organizer/groupMember/UpdateGroupMemberRequest";
import { GroupMemberOutputDTO } from "../../dto/organizer/groupMember/GroupMemberOutputDTO";
import { OrganizerAccessService } from "../../services/validation/OrganizerAccessService";
import { AddGroupMemberUseCase } from "../../usecases/organizer/groupMember/AddGroupMemberUseCase";
import { GetGroupMembersUseCase } from "../../usecases/organizer/groupMember/GetGroupMembersUseCase";
import { RemoveGroupMemberUseCase } from "../../usecases/organizer/groupMember/RemoveGroupMemberUseCase";

export class GroupMemberFacade {

    private readonly addGroupMemberUseCase: AddGroupMemberUseCase;
    private readonly removeGroupMemberUseCase: RemoveGroupMemberUseCase;
    private readonly getGroupMembersUseCase: GetGroupMembersUseCase;
    private readonly organizerAccessService: OrganizerAccessService;

    constructor() {
        this.addGroupMemberUseCase = new AddGroupMemberUseCase();
        this.removeGroupMemberUseCase = new RemoveGroupMemberUseCase();
        this.getGroupMembersUseCase = new GetGroupMembersUseCase();
        this.organizerAccessService = new OrganizerAccessService();
    }

    public async addGroupMember(request: RegisterGroupMemberRequest, userId: number): Promise<void> {
        const { groupId, membersId } = request;

        await this.organizerAccessService.validateAccess({ userId });
        await this.addGroupMemberUseCase.execute(groupId, membersId);
    }

    public async removeGroupMember(request: UpdateGroupMemberRequest, userId: number): Promise<void> {
        const { groupId, memberId } = request;

        await this.organizerAccessService.validateAccess({ userId });
        await this.removeGroupMemberUseCase.execute(groupId, memberId);
    }

    public async getGroupMembers(groupId: number, userId: number): Promise<GroupMemberOutputDTO> {
        await this.organizerAccessService.validateAccess({ userId });
        
        return await this.getGroupMembersUseCase.execute(groupId);
    }

}
