import { RegisterGroupMemberRequest } from "../../../infrastructure/requests/organizer/groupMember/RegisterGroupMemberRequest";
import { GroupMemberOutputDTO } from "../../dto/organizer/groupMember/GroupMemberOutputDTO";
import { AccessValidationHandler } from "../../handlers/access/organizer/AccessValidationHandler";
import { AddGroupMemberUseCase } from "../../usecases/organizer/groupMember/AddGroupMemberUseCase";
import { GetGroupMembersUseCase } from "../../usecases/organizer/groupMember/GetGroupMembersUseCase";
import { RemoveGroupMemberUseCase } from "../../usecases/organizer/groupMember/RemoveGroupMemberUseCase";

export class GroupMemberFacade {

    private readonly addGroupMemberUseCase: AddGroupMemberUseCase;
    private readonly removeGroupMemberUseCase: RemoveGroupMemberUseCase;
    private readonly getGroupMembersUseCase: GetGroupMembersUseCase;
    private readonly organizerAccessValidationHandler: AccessValidationHandler;

    constructor() {
        this.addGroupMemberUseCase = new AddGroupMemberUseCase();
        this.removeGroupMemberUseCase = new RemoveGroupMemberUseCase();
        this.getGroupMembersUseCase = new GetGroupMembersUseCase();
        this.organizerAccessValidationHandler = new AccessValidationHandler();
    }

    public async addGroupMember(request: RegisterGroupMemberRequest, userId: number): Promise<void> {
        const { groupId, membersId } = request;

        await this.organizerAccessValidationHandler.organizerAccessValidation(userId);
        await this.addGroupMemberUseCase.execute(groupId, membersId);
    }

    public async removeGroupMember(groupId: number, memberId: number, userId: number): Promise<void> {
        await this.organizerAccessValidationHandler.organizerAccessValidation(userId);
        await this.removeGroupMemberUseCase.execute(groupId, memberId);
    }

    public async getGroupMembers(groupId: number, userId: number): Promise<GroupMemberOutputDTO> {
        await this.organizerAccessValidationHandler.organizerAccessValidation(userId);
        
        return await this.getGroupMembersUseCase.execute(groupId);
    }

}
