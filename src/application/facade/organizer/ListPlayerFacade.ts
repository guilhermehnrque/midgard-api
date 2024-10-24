import { PlayerListRequest } from "../../../infrastructure/requests/organizer/listPlayer/PlayerListRequest";
import { ListPlayerOutputDTO } from "../../dto/organizer/listPlayer/ListPlayerOutputDTO";
import { AccessValidationHandler } from "../../handlers/access/organizer/AccessValidationHandler";
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
    private readonly organizerAccessValidationHandler: AccessValidationHandler;

    constructor() {
        this.getPlayersUseCase = new GetPlayersUseCase();
        this.addPlayerUseCase = new AddPlayerUseCase();
        this.removePlayerUseCase = new RemovePlayerUseCase();
        this.addGuestUseCase = new AddGuestUseCase();
        this.removeGuestUseCase = new RemoveGuestUseCase();
        this.updatePlayerStatusUseCase = new UpdatePlayerStatusUseCase();
        this.organizerAccessValidationHandler = new AccessValidationHandler();
    }

    public async getPlayers(request: PlayerListRequest, userId: number): Promise<ListPlayerOutputDTO[]> {
        const { listId } = request;

        await this.organizerAccessValidationHandler.listOrganizerAccessValidation(userId, listId);
        return await this.getPlayersUseCase.execute(listId!);
    }

    public async addPlayer(request: PlayerListRequest, userId: number): Promise<void> {
        const { playerId, listId, status } = request;

        await this.organizerAccessValidationHandler.listOrganizerAccessValidation(userId, listId);
        await this.addPlayerUseCase.execute(playerId!, listId!, status!);
    }

    public async removePlayer(listId: number, playerId: number, userId: number): Promise<void> {
        await this.organizerAccessValidationHandler.listOrganizerAccessValidation(userId, listId);
        await this.removePlayerUseCase.execute(listId, playerId);
    }

    public async addGuest(request: PlayerListRequest, userId: number): Promise<void> {
        const { listId, guestId } = request;

        await this.organizerAccessValidationHandler.listOrganizerAccessValidation(userId, listId);
        await this.addGuestUseCase.execute(listId!, guestId!);
    }

    public async removeGuest(request: PlayerListRequest, userId: number): Promise<void> {
        const { listId, guestId, playerListId  } = request;

        await this.organizerAccessValidationHandler.listOrganizerAccessValidation(userId, listId);
        await this.removeGuestUseCase.execute(guestId!, listId!, playerListId!);
    }

    public async updateListPlayer(request: PlayerListRequest, userId: number): Promise<void> {
        const { playerId, listId, status } = request;

        await this.organizerAccessValidationHandler.listOrganizerAccessValidation(userId, listId);
        await this.updatePlayerStatusUseCase.execute(playerId!, listId!, status!);
    }

}
