import { ListBaseEntity } from "../../../../domain/entity/ListBaseEntity";
import { ListPlayerEntity } from "../../../../domain/entity/ListPlayerEntity";
import { ListNotFoundError, PlayerNotFoundInListError } from "../../../erros/list/ListBaseErrors";
import { ListBaseService } from "../../../services/ListBaseService";
import { ListPlayerService } from "../../../services/ListPlayerService";
import { PlayerStatusVO } from "../../../valueobjects/PlayerStatusVO";

export class RemovePlayerUseCase {

    private readonly listBaseService: ListBaseService
    private readonly listPlayerService: ListPlayerService;
    private readonly NUMBER_ONE: number = 1 as const;

    constructor() {
        this.listBaseService = new ListBaseService();
        this.listPlayerService = new ListPlayerService();
    }

    public async execute(listId: number, playerId: number,): Promise<void> {
        const list = await this.listBaseService.getList(listId);
        await this.checkList(list);

        const playerList = await this.listPlayerService.getPlayerInListByPlayerIdAndListId(playerId, listId);
        await this.checkPlayerOnList(playerList!);

        const listPlayer = await ListPlayerEntity.fromUpdateUseCase({
            id: playerList!.id,
            list_base_id: listId,
            player_status: PlayerStatusVO.DECLINED,
            users_id: playerId
        });

        await this.listPlayerService.removePlayerFromList(listPlayer);
        await this.listBaseService.removePlayerFromConfirmedPlayers(list!);
    }

    private async checkList(listEntity: ListBaseEntity | null): Promise<void> {
        if (listEntity != null) {
            return;
        }

        throw new ListNotFoundError();
    }

    private async checkPlayerOnList(listPlayerEntity: ListPlayerEntity | null): Promise<void> {
        if (listPlayerEntity == null) {
            return;
        }

        throw new PlayerNotFoundInListError();
    }

}