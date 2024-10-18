import { ListOutputDTO } from "../../../dto/organizer/list/ListOutputDTO";
import { ListBaseService } from "../../../services/ListBaseService";

export class GetListsUseCase {

    private readonly listBaseService: ListBaseService;

    constructor() {
        this.listBaseService = new ListBaseService();
    }

    public async execute(groupIdPk: number): Promise<ListOutputDTO[]> {
        const lists = await this.listBaseService.getListsByGroupId(groupIdPk);

        return ListOutputDTO.fromEntities(lists);
    }

}