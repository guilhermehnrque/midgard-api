import { ListBaseEntity } from "../../../../domain/entity/ListBaseEntity";
import { ListDTO } from "../../../dto/organizer/list/ListDTO";
import { ListBaseService } from "../../../services/ListBaseService";

export class UpdateListUseCae {

    private readonly listBaseService: ListBaseService;

    constructor() {
        this.listBaseService = new ListBaseService();
    }

    public async execute(listIdPk: number, listDTO: ListDTO): Promise<number> {
        await this.validateListExists(listIdPk);
 
        const listEntity = ListBaseEntity.fromUpdateUseCase(listDTO, listIdPk);

        return await this.listBaseService.updateList(listEntity);
    }

    private async validateListExists(listIdPk: number) {
        await this.listBaseService.getList(listIdPk);
    }

}