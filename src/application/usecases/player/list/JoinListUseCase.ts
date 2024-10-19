import { ListPlayerEntity } from "../../../../domain/entity/ListPlayerEntity";
import { PlayerAlreadyInListError } from "../../../erros/list/ListBaseErrors";
import { ListNotActiveError } from "../../../erros/list/ListNotActiveError";
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
        await this.isListEnrollmentAvailable(userIdPk, listIdPk);
        await this.isPlayerAlreadyOnList(userIdPk, listIdPk);

        const listPlayer = await ListPlayerEntity.fromCreateUseCase({
            list_base_id: listIdPk,
            player_status: 'pending',
            users_id: userIdPk
        });

        await this.listPlayerService.addPlayerToList(listPlayer);
    }

    private async isListEnrollmentAvailable(userIdPk: number, listIdPk: number): Promise<void> {
        const list = await this.listBaseService.getList(listIdPk);

        if (!list.status) {
            console.error(`[JoinListUseCase] -> List is not active for enrollment`);
            throw new ListNotActiveError();
        }

    }

    private async isPlayerAlreadyOnList(userIdPk: number, listIdPk: number): Promise<void> {
        const listPlayers = await this.listPlayerService.getListPlayersByListId(listIdPk);

        const isPlayerOnList = listPlayers.filter(player => player.users_id == userIdPk);

        if (isPlayerOnList.length > 0) {
            console.error(`[JoinListUseCase] -> Player already on list`);
            throw new PlayerAlreadyInListError();
        }

    }

}