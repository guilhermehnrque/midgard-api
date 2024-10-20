import { ListPlayerEntity } from "../../../../domain/entity/ListPlayerEntity";
import { PlayerAlreadyInListError } from "../../../erros/list/ListBaseErrors";
import { LimitOfPlayersError } from "../../../erros/listPlayer/LimitOfPlayersError";
import { ListBaseService } from "../../../services/ListBaseService";
import { ListPlayerService } from "../../../services/ListPlayerService";

export class AddPlayerUseCase {

    private readonly listBaseService: ListBaseService;
    private readonly listPlayerService: ListPlayerService;

    constructor() {
        this.listBaseService = new ListBaseService();
        this.listPlayerService = new ListPlayerService();
    }

    public async execute(memberIdPk: number, listIdPk: number): Promise<void> {
        const list = await this.listBaseService.getList(listIdPk);

        await this.isPlayertOnTheList(memberIdPk, listIdPk)
        await this.validateListLimit(list.getPlayerLimit(), listIdPk)

        const listPlayer = await ListPlayerEntity.fromCreateUseCase({
            list_base_id: listIdPk,
            player_status: 'pending',
            users_id: memberIdPk
        });

        await this.listPlayerService.addPlayerToList(listPlayer);
        await this.listBaseService.addConfirmedPlayers(listIdPk, list.getConfirmedPlayers());
    }

    private async validateListLimit(limitOfPlayers: number, listIdPk: number): Promise<void> {
        const listOfPlayers = await this.listPlayerService.getListPlayersByListId(listIdPk);
        const confirmedPlayers = listOfPlayers.filter(player => player.player_status == "confirmed");

        const totalConfirmed = confirmedPlayers.length

        if (totalConfirmed > limitOfPlayers) {
            throw new LimitOfPlayersError();
        }
    }

    private async isPlayertOnTheList(memberIdPk: number, listIdPk: number): Promise<void> {
        const response = await this.listPlayerService.validatePlayerIsOnList(memberIdPk, listIdPk);

        if (response) {
            console.error(`Player already in list: ${memberIdPk})`)
            throw new PlayerAlreadyInListError("Player is already in the list");
        }
    }
}