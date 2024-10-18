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

        await this.validateListExists(listEntity);

        await this.listBaseService.createList(listEntity);
    }

    private async validateListExists(listEntity: ListBaseEntity) {
        const list = await this.listBaseService.getListByGroupIdAndTimes(
            listEntity.groups_id,
            listEntity.starting_time,
            listEntity.ending_time,
            listEntity.day_of_week
        );

        if (list != null) {
            throw new ListAlreadyExistsError();
        }
    }

}