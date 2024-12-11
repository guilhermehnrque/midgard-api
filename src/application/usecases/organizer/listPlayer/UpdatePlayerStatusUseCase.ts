import { ListPlayerEntity } from "../../../../domain/entity/ListPlayerEntity";
import { PlayerNotFoundInListError } from "../../../erros/list/ListBaseErrors";
import { ListBaseService } from "../../../services/ListBaseService";
import { ListPlayerService } from "../../../services/ListPlayerService";
import { PlayerStatusVO } from "../../../valueobjects/PlayerStatusVO";
import { ListBaseEntity } from "../../../../domain/entity/ListBaseEntity";

export class UpdatePlayerStatusUseCase {

    private readonly listPlayerService: ListPlayerService;
    private readonly listBaseService: ListBaseService;

    constructor() {
        this.listPlayerService = new ListPlayerService();
        this.listBaseService = new ListBaseService();
    }

    public async execute(memberIdPk: number, listIdPk: number, status: string): Promise<void> {
        const playerList = await this.getPlayerOnList(memberIdPk, listIdPk)
        const list = await this.listBaseService.getList(listIdPk);

        const listPlayerEntity = await ListPlayerEntity.fromUpdateUseCase({
            list_base_id: listIdPk,
            player_status: status,
            users_id: memberIdPk,
            id: playerList.id
        });

        await this.listPlayerService.updatePlayerStatus(listPlayerEntity);
        await this.updateListCapacity(list!, status);
    }

    private async getPlayerOnList(memberIdPk: number, listIdPk: number): Promise<ListPlayerEntity> {
        const response = await this.listPlayerService.getPlayerInListByPlayerIdAndListId(memberIdPk, listIdPk);

        if (response == null) {
            throw new PlayerNotFoundInListError();
        }

        return response
    }

    private async updateListCapacity(listEntity: ListBaseEntity, status: string): Promise<void> {
        if (status == PlayerStatusVO.CONFIRMED) {
            await this.listPlayerService.checkListCapacity(listEntity.getListIdPk(), listEntity.getPlayerLimit())
            await this.listBaseService.includePlayerInConfirmedPlayers(listEntity);
        }

        await this.listBaseService.removePlayerFromConfirmedPlayers(listEntity);
    }
}