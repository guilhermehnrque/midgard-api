import { PlayerListRequest } from "../../../infrastructure/requests/organizer/listPlayer/PlayerListRequest";
import { ListPlayerOutputDTO } from "../../dto/organizer/listPlayer/ListPlayerOutputDTO";
import { AddGuestUseCase } from "../../usecases/organizer/listPlayer/AddGuestUseCase";
import { AddPlayerUseCase } from "../../usecases/organizer/listPlayer/AddPlayerUseCase";
import { GetPlayersUseCase } from "../../usecases/organizer/listPlayer/GetPlayersUseCase";
import { RemoveGuestUseCase } from "../../usecases/organizer/listPlayer/RemoveGuestUseCase";
import { RemovePlayerUseCase } from "../../usecases/organizer/listPlayer/RemovePlayerUseCase";
import { UpdatePlayerStatusUseCase } from "../../usecases/organizer/listPlayer/UpdatePlayerStatusUseCase";

export class ListPlayerFacade {

    private readonly getPlayersUseCase: GetPlayersUseCase;
    private readonly addPlayerUseCase: AddPlayerUseCase;
    private readonly removePlayerUseCase: RemovePlayerUseCase;
    private readonly addGuestUseCase: AddGuestUseCase;
    private readonly removeGuestUseCase: RemoveGuestUseCase;
    private readonly updatePlayerStatusUseCase :UpdatePlayerStatusUseCase;

    constructor() {
        this.getPlayersUseCase = new GetPlayersUseCase();
        this.addPlayerUseCase = new AddPlayerUseCase();
        this.removePlayerUseCase = new RemovePlayerUseCase();
        this.addGuestUseCase = new AddGuestUseCase();
        this.removeGuestUseCase = new RemoveGuestUseCase();
        this.updatePlayerStatusUseCase = new UpdatePlayerStatusUseCase();
    }

    public async getPlayers(request: PlayerListRequest): Promise<ListPlayerOutputDTO[]> {
        const { listId } = request;

        return await this.getPlayersUseCase.execute(listId!);
    }

    public async addPlayer(request: PlayerListRequest): Promise<void> {
        const { playerId, listId, status } = request;

        await this.addPlayerUseCase.execute(playerId!, listId!, status!);
    }

    public async removePlayer(listId: number, playerId: number): Promise<void> {
        await this.removePlayerUseCase.execute(listId, playerId);
    }

    public async addGuest(request: PlayerListRequest): Promise<void> {
        const { listId, guestId } = request;

        await this.addGuestUseCase.execute(listId!, guestId!);
    }

    public async removeGuest(request: PlayerListRequest): Promise<void> {
        const { listId, guestId, playerListId  } = request;

        await this.removeGuestUseCase.execute(guestId!, listId!, playerListId!);
    }

    public async updateListPlayer(request: PlayerListRequest): Promise<void> {
        const { playerId, listId, status } = request;

        await this.updatePlayerStatusUseCase.execute(playerId!, listId!, status!);
    }

}
