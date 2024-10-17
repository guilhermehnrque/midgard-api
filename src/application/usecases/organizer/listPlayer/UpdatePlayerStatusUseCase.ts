import { ListPlayerEntity } from "../../../../domain/entity/ListPlayerEntity";
import { PlayerNotFoundInListError } from "../../../erros/list/ListBaseErrors";
import { ListPlayerService } from "../../../services/ListPlayerService";

export class UpdatePlayerStatusUseCase {

    private readonly listPlayerService: ListPlayerService;

    constructor() {
        this.listPlayerService = new ListPlayerService();
    }

    public async execute(memberIdPk: number, listIdPk: number, playerListIdPk: number, status: string): Promise<void> {
        await this.isPlayertOnTheList(memberIdPk, listIdPk)

        const listPlayer = await ListPlayerEntity.fromUpdateUseCase({
            id: playerListIdPk,
            list_base_id: listIdPk,
            player_status: status,
            users_id: memberIdPk
        });

        await this.listPlayerService.updatePlayerStatus(listPlayer);
    }

    private async isPlayertOnTheList(memberIdPk: number, listIdPk: number): Promise<void> {
        const response = await this.listPlayerService.validatePlayerIsOnList(memberIdPk, listIdPk);

        if (!response) {
            console.error(`Player not found in list: ${memberIdPk})`)
            throw new PlayerNotFoundInListError();
        }
    }
}