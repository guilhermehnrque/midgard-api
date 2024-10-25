import { CreateGuestUseCase } from "../../usecases/common/CreateGuestUseCase";
import { DeleteGuestUseCase } from "../../usecases/common/DeleteGuestUseCase";
import { GetGuestsUseCase } from "../../usecases/common/GetGuestsUseCase";
import { UpdateGuestUseCase } from "../../usecases/common/UpdateGuestUseCase";

export class GuestFacade {
    
    private readonly createGuestUseCase: CreateGuestUseCase;
    private readonly getGuestsUseCase: GetGuestsUseCase;
    private readonly updateGuestUseCase: UpdateGuestUseCase;
    private readonly deleteGuestUseCase: DeleteGuestUseCase;

    constructor() {
        this.createGuestUseCase = new CreateGuestUseCase();
        this.getGuestsUseCase = new GetGuestsUseCase();
        this.updateGuestUseCase = new UpdateGuestUseCase();
        this.deleteGuestUseCase = new DeleteGuestUseCase();
    }

    public async createGuest(guestName: string, usersId: number): Promise<void> {
        await this.createGuestUseCase.execute(guestName, usersId);
    }

    public async getGuests(usersId: number): Promise<Object[]> {
        return await this.getGuestsUseCase.execute(usersId);
    }

    public async updateGuest(guestId: number, guestName: string): Promise<void> {
        await this.updateGuestUseCase.execute(guestId, guestName);
    }

    public async deleteGuest(guestId: number): Promise<void> {
        await this.deleteGuestUseCase.execute(guestId);
    }

}
