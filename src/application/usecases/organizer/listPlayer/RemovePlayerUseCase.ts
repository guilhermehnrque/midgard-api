import { ListPlayerEntity } from "../../../../domain/entity/ListPlayerEntity";
import { PlayerNotFoundInListError } from "../../../erros/list/ListBaseErrors";
import { ListBaseService } from "../../../services/ListBaseService";
import { ListPlayerService } from "../../../services/ListPlayerService";

export class RemovePlayerUseCase {

    private readonly listBaseService: ListBaseService
    private readonly listPlayerService: ListPlayerService;

    constructor() {
        this.listBaseService = new ListBaseService();
        this.listPlayerService = new ListPlayerService();
    }

    public async execute(memberIdPk: number, listIdPk: number, playerListIdPk: number, status: string): Promise<void> {
        const list = await this.listBaseService.getList(listIdPk);
        await this.isPlayertOnTheList(memberIdPk, listIdPk)

        const listPlayer = await ListPlayerEntity.fromUpdateUseCase({
            id: playerListIdPk,
            list_base_id: listIdPk,
            player_status: status,
            users_id: memberIdPk
        });

        await this.listPlayerService.removePlayerFromList(listPlayer);
        await this.listBaseService.removeConfirmedPlayers(listIdPk, list.getConfirmedPlayers());
    }

    private async isPlayertOnTheList(memberIdPk: number, listIdPk: number): Promise<void> {
        const response = await this.listPlayerService.validatePlayerIsOnList(memberIdPk, listIdPk);

        if (!response) {
            console.error(`Player not found in list: ${memberIdPk})`)
            throw new PlayerNotFoundInListError();
        }
    }
}