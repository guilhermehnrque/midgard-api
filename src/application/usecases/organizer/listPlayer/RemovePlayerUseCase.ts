import { ListPlayerEntity } from "../../../../domain/entity/ListPlayerEntity";
import { PlayerNotFoundInListError } from "../../../erros/list/ListBaseErrors";
import { ListBaseService } from "../../../services/ListBaseService";
import { ListPlayerService } from "../../../services/ListPlayerService";
import { PlayerStatusVO } from "../../../valueobjects/PlayerStatusVO";

export class RemovePlayerUseCase {

    private readonly listBaseService: ListBaseService
    private readonly listPlayerService: ListPlayerService;

    constructor() {
        this.listBaseService = new ListBaseService();
        this.listPlayerService = new ListPlayerService();
    }

    public async execute(listId: number, playerId: number,): Promise<void> {
        const list = await this.listBaseService.getList(listId);
        const playerList = await this.getPlayerOnList(playerId, listId)

        const listPlayer = await ListPlayerEntity.fromUpdateUseCase({
            id: playerList.id,
            list_base_id: listId,
            player_status: PlayerStatusVO.DECLINED,
            users_id: playerId
        });

        await this.listPlayerService.removePlayerFromList(listPlayer);
        await this.listBaseService.removeConfirmedPlayers(list);
    }

    private async getPlayerOnList(memberIdPk: number, listIdPk: number): Promise<ListPlayerEntity> {
        const response = await this.listPlayerService.getPlayerInListByPlayerIdAndListId(memberIdPk, listIdPk);

        if (response == null) {
            console.error(`Player not found in list: ${memberIdPk})`)
            throw new PlayerNotFoundInListError();
        }

        return response
    }
}