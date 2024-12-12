import { ListBaseEntity } from "../../../../domain/entity/ListBaseEntity";
import { ListDTO } from "../../../dto/organizer/list/ListDTO";
import { ListAlreadyExistsError } from "../../../erros/list/ListAlreadyExistsError";
import { ListBaseService } from "../../../services/ListBaseService";

export class CreateListUseCase {

    private readonly listBaseService: ListBaseService;

    constructor() {
        this.listBaseService = new ListBaseService();
    }

    public async execute(listDTO: ListDTO): Promise<void> {
        const listEntity = ListBaseEntity.fromCreateUseCase(listDTO);

        await this.checkConflict(listEntity);

        await this.listBaseService.createList(listEntity);
    }

    private async checkConflict(listEntity: ListBaseEntity) {
        const list = await this.listBaseService.getListByGroupIdTimesAndLocal(
            listEntity.getGroupId(),
            listEntity.getStartingTime(),
            listEntity.getEndingTime(),
            listEntity.getDayOfWeek(),
            listEntity.getLocalId()
        );

        if (list != null) {
            throw new ListAlreadyExistsError();
        }
    }

}