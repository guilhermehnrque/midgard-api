import { ListPlayerEntity } from "../../../../domain/entity/ListPlayerEntity";
import { PlayerNotFoundInListError } from "../../../erros/list/ListBaseErrors";
import { ListPlayerService } from "../../../services/ListPlayerService";

export class RemoveGuestUseCase {

    private readonly listPlayerService: ListPlayerService;

    constructor() {
        this.listPlayerService = new ListPlayerService();
    }

    public async execute(guestIdPk: number, listIdPk: number, playerListIdPk: number): Promise<void> {
        await this.isPlayertOnTheList(guestIdPk, listIdPk)

        const listPlayer = await ListPlayerEntity.fromUpdateUseCase({
            id: playerListIdPk,
            list_base_id: listIdPk,
            player_status: 'declined',
            guest_id: guestIdPk
        });

        await this.listPlayerService.removePlayerFromList(listPlayer);
    }

    private async isPlayertOnTheList(memberIdPk: number, listIdPk: number): Promise<void> {
        const response = await this.listPlayerService.validateGuestIsOnList(memberIdPk, listIdPk);

        if (!response) {
            console.error(`Player not found in list: ${memberIdPk})`)
            throw new PlayerNotFoundInListError();
        }
    }
}