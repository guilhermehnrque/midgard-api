import { ListOutputDTO } from "../../../dto/organizer/list/ListOutputDTO";
import { ListBaseService } from "../../../services/ListBaseService";

export class GetListUseCase {

    private readonly listBaseService: ListBaseService;

    constructor() {
        this.listBaseService = new ListBaseService();
    }

    public async execute(listIdPk: number): Promise<ListOutputDTO> {
        const lists = await this.listBaseService.getList(listIdPk);

        return ListOutputDTO.fromEntity(lists);
    }

}