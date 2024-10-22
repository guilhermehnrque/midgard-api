import { GroupMembershipAccessService } from "../../services/validation/player/GroupMembershipAccessService";
import { JoinGroupUseCase } from "../../usecases/player/group/JoinGroupUseCase";
import { GroupDetailsUseCase } from "../../usecases/player/group/GroupDetailsUseCase";
import { LeaveGroupUseCase } from "../../usecases/player/group/LeaveGroupUseCase";
import { GroupMembershipsUseCase } from "../../usecases/player/group/GroupMembershipsUseCase";
import { GroupListUseCase } from "../../usecases/player/group/GroupListUseCase";
import { JoinGroupRequest } from "../../../infrastructure/requests/player/group/JoinGroupRequest";
import { GroupsOutputDTO } from "../../dto/player/group/GroupsOutputDTO";

export class GroupPlayerFacade {

    private readonly groupMembershipAccessService: GroupMembershipAccessService;
    private readonly joinGroupUseCase: JoinGroupUseCase;
    private readonly leaveGroupUseCase: LeaveGroupUseCase;
    private readonly groupMembershipUseCase: GroupMembershipsUseCase;
    private readonly groupListUseCase: GroupListUseCase;
    private readonly groupDetailsUseCase: GroupDetailsUseCase;

    constructor() {
        this.groupMembershipAccessService = new GroupMembershipAccessService();
        this.joinGroupUseCase = new JoinGroupUseCase();
        this.leaveGroupUseCase = new LeaveGroupUseCase();
        this.groupMembershipUseCase = new GroupMembershipsUseCase();
        this.groupListUseCase = new GroupListUseCase();
        this.groupDetailsUseCase = new GroupDetailsUseCase();
    }

    public async joinGroup(request: JoinGroupRequest, userIdPk: number): Promise<void> {
        await this.joinGroupUseCase.execute(userIdPk, request.groupId);
    }

    public async getGroups(): Promise<GroupsOutputDTO[]> {
        return await this.groupListUseCase.execute();
    }

    public async getGroupMemberships(userIdPk: number): Promise<GroupsOutputDTO[]> {
        await this.groupMembershipAccessService.validateAccess({ userId: userIdPk });
        return await this.groupMembershipUseCase.execute(userIdPk);
    }

    public async getGroupDetails(groupIdPk: number, userIdPk: number): Promise<Object> {
        await this.groupMembershipAccessService.validateAccess({ userId: userIdPk });
        return await this.groupDetailsUseCase.execute(groupIdPk);
    }

    public async leaveGroup(groupIdPk: number, userIdPk: number): Promise<void> {
        await this.groupMembershipAccessService.validateAccess({ userId: userIdPk });
        await this.leaveGroupUseCase.execute(userIdPk, groupIdPk);
    }

}