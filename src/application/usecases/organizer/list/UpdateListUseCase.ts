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

        const listEntity = await ListBaseEntity.fromUpdateUseCase({
            id: listIdPk,
            status: listDTO.status,
            player_limit: listDTO.playerLimit,
            starting_time: listDTO.startingTime,
            ending_time: listDTO.endingTime,
            day_of_week: listDTO.dayOfWeek,
            groups_id: listDTO.groupId,
            locals_id: listDTO.localId
        });

        return await this.listBaseService.updateList(listEntity);
    }

    private async validateListExists(listIdPk: number) {
        await this.listBaseService.getList(listIdPk);
    }

}