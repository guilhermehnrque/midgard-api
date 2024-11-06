import { CreateListRequest } from "../../../infrastructure/requests/organizer/list/CreateListRequest";
import { UpdateListRequest } from "../../../infrastructure/requests/organizer/list/UpdateListRequest";
import { ListDTO } from "../../dto/organizer/list/ListDTO";
import { ListOutputDTO } from "../../dto/organizer/list/ListOutputDTO";
import { CreateListUseCase } from "../../usecases/organizer/list/CreateListUseCase";
import { GetListsUseCase } from "../../usecases/organizer/list/GetListsUseCase";
import { GetListUseCase } from "../../usecases/organizer/list/GetListUseCase";
import { UpdateListUseCae } from "../../usecases/organizer/list/UpdateListUseCase";

export class ListBaseFacade {

    private readonly createListUseCase: CreateListUseCase;
    private readonly updateListUseCase: UpdateListUseCae;
    private readonly getListsUseCase: GetListsUseCase;
    private readonly getListUseCase: GetListUseCase;

    constructor() {
        this.createListUseCase = new CreateListUseCase();
        this.updateListUseCase = new UpdateListUseCae();
        this.getListsUseCase = new GetListsUseCase();
        this.getListUseCase = new GetListUseCase();
    }

    public async createList(request: CreateListRequest, userId: number): Promise<void> {
        const { groupId, status, limitOfPlayers, startingTime, endingTime, dayOfWeek, localId } = request;

        const listDTO = new ListDTO(status, limitOfPlayers, startingTime, endingTime, dayOfWeek, groupId, localId);

        await this.createListUseCase.execute(listDTO);
    }

    public async updateList(request: UpdateListRequest, listIdPk: number, userId: number): Promise<void> {
        const { groupId, status, limitOfPlayers, startingTime, endingTime, dayOfWeek, localId } = request;

        const listDTO = new ListDTO(status, limitOfPlayers, startingTime, endingTime, dayOfWeek, groupId, localId);

        await this.updateListUseCase.execute(listIdPk, listDTO);
    }

    public async getLists(groupId: number, userId: number): Promise<ListOutputDTO[]> {
        return await this.getListsUseCase.execute(groupId);
    }

    public async getList(listId: number, userId: number): Promise<ListOutputDTO> {
        return await this.getListUseCase.execute(listId);
    }

}
