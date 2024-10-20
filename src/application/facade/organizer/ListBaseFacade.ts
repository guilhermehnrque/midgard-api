import { CreateListRequest } from "../../../infrastructure/requests/organizer/list/CreateListRequest";
import { UpdateListRequest } from "../../../infrastructure/requests/organizer/list/UpdateListRequest";
import { ListDTO } from "../../dto/organizer/list/ListDTO";
import { ListOutputDTO } from "../../dto/organizer/list/ListOutputDTO";
import { OrganizerAccessService } from "../../services/validation/OrganizerAccessService";
import { CreateListUseCase } from "../../usecases/organizer/list/CreateListUseCase";
import { GetListsUseCase } from "../../usecases/organizer/list/GetListsUseCase";
import { GetListUseCase } from "../../usecases/organizer/list/GetListUseCase";
import { UpdateListUseCae } from "../../usecases/organizer/list/UpdateListUseCase";

export class ListBaseFacade {

    private readonly createListUseCase: CreateListUseCase;
    private readonly updateListUseCase: UpdateListUseCae;
    private readonly getListsUseCase: GetListsUseCase;
    private readonly getListUseCase: GetListUseCase;
    private readonly organizerAccessService: OrganizerAccessService;

    constructor() {
        this.createListUseCase = new CreateListUseCase();
        this.updateListUseCase = new UpdateListUseCae();
        this.getListsUseCase = new GetListsUseCase();
        this.getListUseCase = new GetListUseCase();
        this.organizerAccessService = new OrganizerAccessService();
    }

    public async createList(request: CreateListRequest, userId: number): Promise<void> {
        const { groupId, status, limitOfPlayers, startingTime, endingTime, dayOfWeek, localId } = request;

        await this.organizerAccessService.validateAccess({ groupId, userId });

        const listDTO = new ListDTO(status, limitOfPlayers, startingTime, endingTime, dayOfWeek, groupId, localId);

        await this.createListUseCase.execute(listDTO);
    }

    public async updateList(request: UpdateListRequest, listIdPk: number, userId: number): Promise<void> {
        const { groupId, status, limitOfPlayers, startingTime, endingTime, dayOfWeek, localId } = request;

        await this.organizerAccessService.validateAccess({ userId, groupId });

        const listDTO = new ListDTO(status, limitOfPlayers, startingTime, endingTime, dayOfWeek, groupId, localId);

        await this.updateListUseCase.execute(listIdPk, listDTO);
    }

    public async getLists(groupId: number, userId: number): Promise<ListOutputDTO[]> {
        await this.organizerAccessService.validateAccess({ userId, groupId });

        return await this.getListsUseCase.execute(groupId);
    }

    public async getList(listId: number, groupId: number, userId: number): Promise<ListOutputDTO> {
        await this.organizerAccessService.validateAccess({ userId, groupId });

        return await this.getListUseCase.execute(listId);
    }

}
