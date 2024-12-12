import { ListBaseEntity } from "../../../../domain/entity/ListBaseEntity";
import { ListPlayerEntity } from "../../../../domain/entity/ListPlayerEntity";
import { ListNotFoundError, PlayerAlreadyInListError } from "../../../erros/list/ListBaseErrors";
import { ListBaseService } from "../../../services/ListBaseService";
import { ListPlayerService } from "../../../services/ListPlayerService";

export class AddPlayerUseCase {

    private readonly listBaseService: ListBaseService;
    private readonly listPlayerService: ListPlayerService;

    constructor() {
        this.listBaseService = new ListBaseService();
        this.listPlayerService = new ListPlayerService();
    }

    public async execute(memberIdPk: number, listIdPk: number, playerStatus: string): Promise<void> {
        const list = await this.listBaseService.getList(listIdPk);
        await this.checkList(list);

        await this.isPlayerAlreadyOnList(memberIdPk, listIdPk)
        await this.listPlayerService.checkListCapacity(listIdPk, list!.getPlayerLimit())

        const listPlayer = await ListPlayerEntity.fromCreateUseCase({
            list_base_id: listIdPk,
            player_status: playerStatus,
            users_id: memberIdPk
        });

        await this.listPlayerService.addPlayerToList(listPlayer);
        await this.listBaseService.includePlayerInConfirmedPlayers(list!);
    }

    private async checkList(listEntity: ListBaseEntity | null): Promise<void> {
        if (listEntity != null) {
           return
        }

        throw new ListNotFoundError();
    }


    private async isPlayerAlreadyOnList(memberIdPk: number, listIdPk: number): Promise<void> {
        const response = await this.listPlayerService.validatePlayerIsOnList(memberIdPk, listIdPk);

        if (!response) {
            return
        }

        throw new PlayerAlreadyInListError("Player is already in the list");
    }
}