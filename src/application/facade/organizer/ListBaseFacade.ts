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

    public async createList(request: any, userId: string): Promise<void> {
        const { groupId, status, playerLimit, startingTime, endingTime, dayOfWeek, localId } = request;

        await this.organizerAccessService.validateAccess({ groupId, userId });

        const listDTO = new ListDTO(status, playerLimit, startingTime, endingTime, dayOfWeek, groupId, localId);

        await this.createListUseCase.execute(listDTO);
    }

    public async updateList(request: any, userId: string): Promise<void> {
        const { listIdPk, groupId, status, playerLimit, startingTime, endingTime, dayOfWeek, localId } = request;

        await this.organizerAccessService.validateAccess({ userId, groupId });

        const listDTO = new ListDTO(status, playerLimit, startingTime, endingTime, dayOfWeek, groupId, localId);

        await this.updateListUseCase.execute(listIdPk, listDTO);
    }

    public async getLists(request: any, userId: string): Promise<ListOutputDTO[]> {
        const { groupId } = request;
        await this.organizerAccessService.validateAccess({ userId, groupId });

        return await this.getListsUseCase.execute(groupId);
    }

    public async getList(request: any, userId: string): Promise<ListOutputDTO> {
        const { listIdPk, groupId } = request;
        await this.organizerAccessService.validateAccess({ userId, groupId });

        return await this.getListUseCase.execute(listIdPk);
    }

}