import { ListBaseEntity } from "../../../../domain/entity/ListBaseEntity";
import { ListPlayerEntity } from "../../../../domain/entity/ListPlayerEntity";
import { PlayerAlreadyInListError } from "../../../erros/list/ListBaseErrors";
import { ListNotActiveError } from "../../../erros/list/ListNotActiveError";
import { ListBaseService } from "../../../services/ListBaseService";
import { ListPlayerService } from "../../../services/ListPlayerService";
import { PlayerStatusVO } from "../../../valueobjects/PlayerStatusVO";

export class JoinListUseCase {

    private readonly listBaseService: ListBaseService
    private readonly listPlayerService: ListPlayerService;

    constructor() {
        this.listBaseService = new ListBaseService();
        this.listPlayerService = new ListPlayerService();
    }

    public async execute(userIdPk: number, listIdPk: number): Promise<void> {
        const list = await this.listBaseService.getList(listIdPk);
        
        await this.checkList(list!);
        await this.isPlayerAlreadyOnList(userIdPk, listIdPk);

        const listPlayer = await ListPlayerEntity.fromCreateUseCase({
            list_base_id: listIdPk,
            player_status: PlayerStatusVO.CONFIRMED,
            users_id: userIdPk
        });

        await this.listPlayerService.addPlayerToList(listPlayer);
        await this.listBaseService.includePlayerInConfirmedPlayers(list!);
    }

    private async checkList(list: ListBaseEntity): Promise<void> {
        if (!list.getStatus()) {
            throw new ListNotActiveError();
        }
    }

    private async isPlayerAlreadyOnList(userIdPk: number, listIdPk: number): Promise<void> {
        const isOnList = await this.listPlayerService.validatePlayerIsOnList(listIdPk, userIdPk);

        if (!isOnList) {
            return
        }

        throw new PlayerAlreadyInListError();
    }


}