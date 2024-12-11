import { ListPlayerEntity } from "../../../../domain/entity/ListPlayerEntity";
import { PlayerNotFoundInListError } from "../../../erros/list/ListBaseErrors";
import { ListBaseService } from "../../../services/ListBaseService";
import { ListPlayerService } from "../../../services/ListPlayerService";
import { PlayerStatusVO } from "../../../valueobjects/PlayerStatusVO";

export class RemoveGuestUseCase {

    private readonly listBaseService: ListBaseService
    private readonly listPlayerService: ListPlayerService;

    constructor() {
        this.listPlayerService = new ListPlayerService();
        this.listBaseService = new ListBaseService();
    }

    public async execute(guestIdPk: number, listIdPk: number, playerListIdPk: number): Promise<void> {
        const list = await this.listBaseService.getList(listIdPk);
        await this.isPlayertOnTheList(guestIdPk, listIdPk)

        const listPlayer = await ListPlayerEntity.fromUpdateUseCase({
            id: playerListIdPk,
            list_base_id: listIdPk,
            player_status: PlayerStatusVO.DECLINED,
            guest_id: guestIdPk
        });

        await this.listPlayerService.removePlayerFromList(listPlayer);
        await this.listBaseService.removePlayerFromConfirmedPlayers(list!);
    }

    private async isPlayertOnTheList(memberIdPk: number, listIdPk: number): Promise<void> {
        const response = await this.listPlayerService.validateGuestIsOnList(memberIdPk, listIdPk);

        if (response) {
            return 
        }

        throw new PlayerNotFoundInListError();
    }
}