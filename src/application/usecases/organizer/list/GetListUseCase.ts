import { ListBaseEntity } from "../../../../domain/entity/ListBaseEntity";
import { ListOutputDTO } from "../../../dto/organizer/list/ListOutputDTO";
import { ListNotFoundError } from "../../../erros/list/ListBaseErrors";
import { ListBaseService } from "../../../services/ListBaseService";

export class GetListUseCase {

    private readonly listBaseService: ListBaseService;

    constructor() {
        this.listBaseService = new ListBaseService();
    }

    public async execute(listIdPk: number): Promise<ListOutputDTO> {
        const lists = await this.listBaseService.getList(listIdPk);

        await this.checkList(lists);

        return ListOutputDTO.fromEntity(lists!);
    }

    private async checkList(list: ListBaseEntity | null): Promise<void> {
        if (list == null) {
            throw new ListNotFoundError();
        }
    }

}