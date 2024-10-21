import { ListBaseEntity } from "../../../../domain/entity/ListBaseEntity";
import { ListsOutputDTO } from "../../../dto/player/lists/ListsOutputDTO";
import { ListBaseService } from "../../../services/ListBaseService";
import { ListPlayerService } from "../../../services/ListPlayerService";

export class JoinedListsUseCase {

    private readonly listBaseService: ListBaseService;
    private readonly listPlayerService: ListPlayerService;

    constructor() {
        this.listBaseService = new ListBaseService();
        this.listPlayerService = new ListPlayerService();
    }

    public async execute(listPlayerIdPk: number, userIdPk: number, listBaseIdPk: number): Promise<ListsOutputDTO[]> {
        const listPlayer = await this.listPlayerService.getListPlayersByListId(userIdPk);

        const listsMapped = await Promise.all(listPlayer.map(async (player) => {
            return await this.listBaseService.getList(player.list_base_id);
        }));

        return this.prepareOutput(listsMapped);
    }

    private prepareOutput(lists: ListBaseEntity[]) {
        return lists.map((list) => this.toDTO(list));
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
