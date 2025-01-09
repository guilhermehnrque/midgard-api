import { ListBaseEntity } from "../../../../domain/entity/ListBaseEntity";
import { ListDTO } from "../../../dto/organizer/list/ListDTO";
import { ListNotFoundError } from "../../../erros/list/ListBaseErrors";
import { ListBaseService } from "../../../services/ListBaseService";

export class UpdateListUseCae {

    private readonly listBaseService: ListBaseService;

    constructor() {
        this.listBaseService = new ListBaseService();
    }

    public async execute(listIdPk: number, listDTO: ListDTO): Promise<number> {
        const lists = await this.listBaseService.getList(listIdPk);
        await this.checkList(lists);
 
        const listEntity = ListBaseEntity.fromUpdateUseCase(listDTO, listIdPk);

        return await this.listBaseService.updateList(listEntity);
    }

    private async checkList(list: ListBaseEntity | null): Promise<void> {
        if (list == null) {
            throw new ListNotFoundError();
        }
    }

}