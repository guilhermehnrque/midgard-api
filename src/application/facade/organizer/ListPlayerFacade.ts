import { OrganizerAccessService } from "../../services/validation/OrganizerAccessService";
import { AddGuestUseCase } from "../../usecases/organizer/listPlayer/AddGuestUseCase";
import { AddPlayerUseCase } from "../../usecases/organizer/listPlayer/AddPlayerUseCase";
import { RemoveGuestUseCase } from "../../usecases/organizer/listPlayer/RemoveGuestUseCase";
import { RemovePlayerUseCase } from "../../usecases/organizer/listPlayer/RemovePlayerUseCase";

export class ListPlayerFacade {

    private readonly addPlayerUseCase: AddPlayerUseCase;
    private readonly removePlayerUseCase: RemovePlayerUseCase;
    private readonly addGuestUseCase: AddGuestUseCase;
    private readonly removeGuestUseCase: RemoveGuestUseCase;
    private readonly organizerAccessService: OrganizerAccessService;

    constructor() {
        this.addPlayerUseCase = new AddPlayerUseCase();
        this.removePlayerUseCase = new RemovePlayerUseCase();
        this.addGuestUseCase = new AddGuestUseCase();
        this.removeGuestUseCase = new RemoveGuestUseCase();
        this.organizerAccessService = new OrganizerAccessService();
    }

    public async addPlayer(request: any, userId: string): Promise<void> {
        const { listIdPk, guestIdPk } = request;

        await this.organizerAccessService.validateAccess({ userId, groupId: listIdPk });
        await this.addPlayerUseCase.execute(guestIdPk, listIdPk);
    }

    public async removePlayer(request: any, userId: string): Promise<void> {
        const { listIdPk, guestIdPk, playerListIdPk } = request;

        await this.organizerAccessService.validateAccess({ userId, groupId: listIdPk });
        await this.removePlayerUseCase.execute(guestIdPk, listIdPk, playerListIdPk);
    }

    public async addGuest(request: any, userId: string): Promise<void> {
        const { listIdPk, guestIdPk } = request;

        await this.organizerAccessService.validateAccess({ userId, groupId: listIdPk });
        await this.addGuestUseCase.execute(guestIdPk, listIdPk);
    }

    public async removeGuest(request: any, userId: string): Promise<void> {
        const { listIdPk, guestIdPk, playerListIdPk } = request;

        await this.organizerAccessService.validateAccess({ userId, groupId: listIdPk });
        await this.removeGuestUseCase.execute(guestIdPk, listIdPk, playerListIdPk);
    }


}