import { GroupMembershipAccessService } from "../../services/validation/player/GroupMembershipAccessService";
import { FetchListsUseCase } from "../../usecases/player/list/FetchListsUseCase";
import { JoinedListsUseCase } from "../../usecases/player/list/JoinedListsUseCase";
import { JoinListUseCase } from "../../usecases/player/list/JoinListUseCase";
import { LeaveListUseCase } from "../../usecases/player/list/LeaveListUseCase";

export class ListPlayerFacade {

    private readonly fetchListsUseCase: FetchListsUseCase
    private readonly joinedListsUseCase: JoinedListsUseCase
    private readonly joinListUseCase: JoinListUseCase
    private readonly leaveListUseCase: LeaveListUseCase
    private readonly groupMembershipAccessService: GroupMembershipAccessService

    constructor() {
        this.fetchListsUseCase = new FetchListsUseCase();
        this.joinedListsUseCase = new JoinedListsUseCase();
        this.joinListUseCase = new JoinListUseCase();
        this.leaveListUseCase = new LeaveListUseCase();
        this.groupMembershipAccessService = new GroupMembershipAccessService();
    }

    public async getJoinedLists(request: any): Promise<any> {
        const { userId } = request;
        await this.groupMembershipAccessService.validateAccess({ userId });

        return await this.joinedListsUseCase.execute(userId);
    }

    public async getLists(request: any): Promise<any> {
        const { userId, groupId } = request;
        await this.groupMembershipAccessService.validateAccess({ userId });

        return await this.fetchListsUseCase.execute(groupId);
    }

    public async joinList(request: any): Promise<any> {
        const { userId, listId } = request;
        await this.groupMembershipAccessService.validateAccess({ userId });

        return await this.joinListUseCase.execute(userId, listId);
    }

    public async leaveList(request: any): Promise<any> {
        const { userId, listId } = request;
        await this.groupMembershipAccessService.validateAccess({ userId });

        return await this.leaveListUseCase.execute(userId, listId);
    }

}
