import { ListBaseEntity } from "../../../../domain/entity/ListBaseEntity";
import { ListPlayerEntity } from "../../../../domain/entity/ListPlayerEntity";
import { PlayerNotFoundInListError } from "../../../erros/list/ListBaseErrors";
import { ListNotActiveError } from "../../../erros/list/ListNotActiveError";
import { ListBaseService } from "../../../services/ListBaseService";
import { ListPlayerService } from "../../../services/ListPlayerService";
import { PlayerStatusVO } from "../../../valueobjects/PlayerStatusVO";

export class LeaveListUseCase {

    private readonly listBaseService: ListBaseService
    private readonly listPlayerService: ListPlayerService;

    constructor() {
        this.listBaseService = new ListBaseService();
        this.listPlayerService = new ListPlayerService();
    }

    public async execute(userIdPk: number, listIdPk: number): Promise<void> {
        const list = await this.listBaseService.getList(listIdPk);

        await this.checkList(list!);
        await this.isPlayerOnList(userIdPk, listIdPk);

        const listPlayer = await ListPlayerEntity.fromUpdateUseCase({
            list_base_id: listIdPk,
            player_status: PlayerStatusVO.DECLINED,
            users_id: userIdPk
        });

        await this.listPlayerService.removePlayerFromList(listPlayer);
        await this.listBaseService.removePlayerFromConfirmedPlayers(list!);
    }

    private async checkList(list: ListBaseEntity): Promise<void> {
        if (!list.getStatus()) {
            throw new ListNotActiveError();
        }
    }

    private async isPlayerOnList(userIdPk: number, listIdPk: number): Promise<void> {
        const listPlayers = await this.listPlayerService.getListPlayersByListId(listIdPk);

        const isPlayerOnList = listPlayers.filter(player => player.users_id == userIdPk);

        if (isPlayerOnList.length > 0) {
            return
        }

        throw new PlayerNotFoundInListError();


    }

}