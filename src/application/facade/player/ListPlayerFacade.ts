import { ListsOutputDTO } from "../../dto/player/lists/ListsOutputDTO";
import { FetchListsUseCase } from "../../usecases/player/list/FetchListsUseCase";
import { JoinedListsUseCase } from "../../usecases/player/list/JoinedListsUseCase";
import { JoinListUseCase } from "../../usecases/player/list/JoinListUseCase";
import { LeaveListUseCase } from "../../usecases/player/list/LeaveListUseCase";

export class ListPlayerFacade {

    private readonly fetchListsUseCase: FetchListsUseCase
    private readonly joinedListsUseCase: JoinedListsUseCase
    private readonly joinListUseCase: JoinListUseCase
    private readonly leaveListUseCase: LeaveListUseCase

    constructor() {
        this.fetchListsUseCase = new FetchListsUseCase();
        this.joinedListsUseCase = new JoinedListsUseCase();
        this.joinListUseCase = new JoinListUseCase();
        this.leaveListUseCase = new LeaveListUseCase();
    }

    public async getJoinedLists(userId: number): Promise<ListsOutputDTO[]> {

        return await this.joinedListsUseCase.execute(userId);
    }

    public async getLists(groupId: number): Promise<{ active: ListsOutputDTO[]; inactive: ListsOutputDTO[] }> {
        return await this.fetchListsUseCase.execute(groupId);
    }

    public async joinList(userId: number, listId: number): Promise<void> {
        return await this.joinListUseCase.execute(userId, listId);
    }

    public async leaveList(userId: number, listId: number): Promise<void> {
        return await this.leaveListUseCase.execute(userId, listId);
    }

}
