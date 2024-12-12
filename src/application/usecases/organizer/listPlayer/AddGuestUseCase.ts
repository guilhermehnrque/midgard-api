import { ListPlayerEntity } from "../../../../domain/entity/ListPlayerEntity";
import { PlayerAlreadyInListError } from "../../../erros/list/ListBaseErrors";
import { ListBaseService } from "../../../services/ListBaseService";
import { ListPlayerService } from "../../../services/ListPlayerService";
import { PlayerStatusVO } from "../../../valueobjects/PlayerStatusVO";

export class AddGuestUseCase {

    private readonly listBaseService: ListBaseService;
    private readonly listPlayerService: ListPlayerService;

    constructor() {
        this.listBaseService = new ListBaseService();
        this.listPlayerService = new ListPlayerService();
    }

    public async execute(guestIdPk: number, listIdPk: number): Promise<void> {
        const list = await this.listBaseService.getList(listIdPk);

        await this.isGuestAlreadyOnList(guestIdPk, listIdPk)
        await this.listPlayerService.checkListCapacity(listIdPk, list!.getPlayerLimit())

        const listPlayer = await ListPlayerEntity.fromCreateUseCase({
            list_base_id: listIdPk,
            player_status: PlayerStatusVO.WAITING,
            guest_id: guestIdPk
        });

        await this.listPlayerService.addPlayerToList(listPlayer);
        await this.listBaseService.includePlayerInConfirmedPlayers(list!);
    }

    private async isGuestAlreadyOnList(guestIdPk: number, listIdPk: number): Promise<void> {
        const response = await this.listPlayerService.validateGuestIsOnList(guestIdPk, listIdPk)

        if (response == null) {
            return 
        }

        throw new PlayerAlreadyInListError();
    }
}