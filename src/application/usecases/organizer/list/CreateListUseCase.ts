import { ListBaseEntity } from "../../../../domain/entity/ListBaseEntity";
import { ListDTO } from "../../../dto/organizer/list/ListDTO";
import { ListBaseService } from "../../../services/ListBaseService";

export class CreateListUseCase {

    private readonly listBaseService: ListBaseService;

    constructor() {
        this.listBaseService = new ListBaseService();
    }

    public async execute(listDTO: ListDTO): Promise<void> {

        const listEntity = await ListBaseEntity.fromCreateUseCase({
            status: true,
            player_limit: listDTO.playerLimit,
            starting_time: listDTO.startingTime,
            ending_time: listDTO.endingTime,
            day_of_week: listDTO.dayOfWeek,
            groups_id: listDTO.groupId,
            locals_id: listDTO.localId
        });

        await this.listBaseService.createList(listEntity);
    }

}