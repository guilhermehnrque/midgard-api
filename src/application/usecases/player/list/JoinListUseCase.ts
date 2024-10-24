import { ListBaseEntity } from "../../../../domain/entity/ListBaseEntity";
import { ListPlayerEntity } from "../../../../domain/entity/ListPlayerEntity";
import { PlayerAlreadyInListError } from "../../../erros/list/ListBaseErrors";
import { ListBaseService } from "../../../services/ListBaseService";
import { ListPlayerService } from "../../../services/ListPlayerService";

export class JoinListUseCase {

    private readonly listBaseService: ListBaseService
    private readonly listPlayerService: ListPlayerService;

    constructor() {
        this.listBaseService = new ListBaseService();
        this.listPlayerService = new ListPlayerService();
    }

    public async execute(userIdPk: number, listIdPk: number): Promise<void> {
        const list = await this.listBaseService.getList(listIdPk);
        this.listBaseService.validateEnrollmentAvailability(list);

        await this.isJoinListLimitReached(list);
        await this.isPlayerAlreadyOnList(userIdPk, listIdPk);

        const listPlayer = await ListPlayerEntity.fromCreateUseCase({
            list_base_id: listIdPk,
            player_status: 'confirmed',
            users_id: userIdPk
        });

        await this.listPlayerService.addPlayerToList(listPlayer);
        await this.listBaseService.addConfirmedPlayers(list);
    }

    private async isJoinListLimitReached(list: ListBaseEntity): Promise<void> {
        await this.listPlayerService.validateListCapacity(list.getListIdPk(), list.getPlayerLimit());
    }

    private async isPlayerAlreadyOnList(userIdPk: number, listIdPk: number): Promise<void> {
        const isOnList = await this.listPlayerService.validatePlayerIsOnList(listIdPk, userIdPk);

        if (isOnList) {
            console.error(`[JoinListUseCase] -> Player already on list`);
            throw new PlayerAlreadyInListError();
        }
    }


}