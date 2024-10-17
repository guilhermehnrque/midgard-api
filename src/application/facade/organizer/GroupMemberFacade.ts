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

    public async addGroupMember(request: any, userId: string): Promise<void> {
        const { groupId, membersId } = request;

        await this.organizerAccessService.validateAccess({ userId });
        await this.addGroupMemberUseCase.execute(groupId, membersId);
    }

    public async removeGroupMember(request: any, userId: string): Promise<void> {
        const { groupId, membersId } = request;

        await this.organizerAccessService.validateAccess({ userId });
        await this.removeGroupMemberUseCase.execute(groupId, membersId);
    }

    public async getGroupMembers(request: any, userId: string): Promise<GroupMemberOutputDTO> {
        const { groupId } = request;

        await this.organizerAccessService.validateAccess({ userId });
        return await this.getGroupMembersUseCase.execute(groupId);
    }

}