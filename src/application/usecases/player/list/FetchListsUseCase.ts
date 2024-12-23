import { ListBaseEntity } from "../../../../domain/entity/ListBaseEntity";
import { ListsOutputDTO } from "../../../dto/player/lists/ListsOutputDTO";
import { ListBaseService } from "../../../services/ListBaseService";

export class FetchListsUseCase {

    private readonly listBaseService: ListBaseService;

    constructor() {
        this.listBaseService = new ListBaseService();
    }

    public async execute(groupIdPk: number): Promise<{ active: ListsOutputDTO[]; inactive: ListsOutputDTO[] }> {
        const lists = await this.listBaseService.getListsByGroupId(groupIdPk);

        return this.prepareOutput(lists);
    }

    private prepareOutput(lists: ListBaseEntity[]) {
        const activeLists = lists.filter((list) => list.isListActive());
        const inactiveLists = lists.filter((list) => !list.isListActive());

        return {
            active: activeLists.map((list) => this.toDTO(list)),
            inactive: inactiveLists.map((list) => this.toDTO(list)),
        };
    }

    private toDTO(list: ListBaseEntity): ListsOutputDTO {
        return new ListsOutputDTO(
            list.id!,
            list.starting_time,
            list.ending_time,
            list.day_of_week,
            list.getConfirmedPlayers()
        );
    }

}
