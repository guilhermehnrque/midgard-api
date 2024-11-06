import { RegisterGroupMemberRequest } from "../../../infrastructure/requests/organizer/groupMember/RegisterGroupMemberRequest";
import { GroupMemberOutputDTO } from "../../dto/organizer/groupMember/GroupMemberOutputDTO";
import { AddGroupMemberUseCase } from "../../usecases/organizer/groupMember/AddGroupMemberUseCase";
import { GetGroupMembersUseCase } from "../../usecases/organizer/groupMember/GetGroupMembersUseCase";
import { RemoveGroupMemberUseCase } from "../../usecases/organizer/groupMember/RemoveGroupMemberUseCase";

export class GroupMemberFacade {

    private readonly addGroupMemberUseCase: AddGroupMemberUseCase;
    private readonly removeGroupMemberUseCase: RemoveGroupMemberUseCase;
    private readonly getGroupMembersUseCase: GetGroupMembersUseCase;

    constructor() {
        this.addGroupMemberUseCase = new AddGroupMemberUseCase();
        this.removeGroupMemberUseCase = new RemoveGroupMemberUseCase();
        this.getGroupMembersUseCase = new GetGroupMembersUseCase();
    }

    public async addGroupMember(request: RegisterGroupMemberRequest): Promise<void> {
        const { groupId, membersId } = request;

        await this.addGroupMemberUseCase.execute(groupId, membersId);
    }

    public async removeGroupMember(groupId: number, memberId: number): Promise<void> {
        await this.removeGroupMemberUseCase.execute(groupId, memberId);
    }

    public async getGroupMembers(groupId: number): Promise<GroupMemberOutputDTO> {
        return await this.getGroupMembersUseCase.execute(groupId);
    }

}
