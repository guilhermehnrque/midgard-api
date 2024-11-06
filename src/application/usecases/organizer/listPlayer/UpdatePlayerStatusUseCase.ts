import { ListPlayerEntity } from "../../../../domain/entity/ListPlayerEntity";
import { PlayerNotFoundInListError } from "../../../erros/list/ListBaseErrors";
import { ListBaseService } from "../../../services/ListBaseService";
import { ListPlayerService } from "../../../services/ListPlayerService";
import { PlayerStatusVO } from "../../../valueobjects/PlayerStatusVO";

export class UpdatePlayerStatusUseCase {

    private readonly listPlayerService: ListPlayerService;
    private readonly listBaseService: ListBaseService;

    constructor() {
        this.listPlayerService = new ListPlayerService();
        this.listBaseService = new ListBaseService();
    }

    public async execute(memberIdPk: number, listIdPK: number, status: string): Promise<void> {
        const playerList = await this.getPlayerOnList(memberIdPk, listIdPK)

        const listPlayerEntity = await ListPlayerEntity.fromUpdateUseCase({
            list_base_id: listIdPK,
            player_status: status,
            users_id: memberIdPk,
            id: playerList.id
        });

        await this.listPlayerService.updatePlayerStatus(listPlayerEntity);
        await this.updateListCapacity(listIdPK, status);
    }

    private async getPlayerOnList(memberIdPk: number, listIdPk: number): Promise<ListPlayerEntity> {
        const response = await this.listPlayerService.getPlayerInListByPlayerIdAndListId(memberIdPk, listIdPk);

        if (response == null) {
            console.error(`Player not found in list: ${memberIdPk})`)
            throw new PlayerNotFoundInListError();
        }

        return response
    }

    private async updateListCapacity(listIdPk: number, status: string): Promise<void> {
        const list = await this.listBaseService.getList(listIdPk);

        switch (status) {
            case PlayerStatusVO.DECLINED:
                await this.listBaseService.removeConfirmedPlayers(list);
                break;
            case PlayerStatusVO.WAITING:
                await this.listBaseService.removeConfirmedPlayers(list);
                break;
            default:
                await this.listBaseService.addConfirmedPlayers(list);
                break;
        }
    }
}