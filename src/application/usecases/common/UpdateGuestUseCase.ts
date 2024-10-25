import { GuestService } from "../../services/GuestService";

export class UpdateGuestUseCase {

    private readonly guestService: GuestService;

    constructor() {
        this.guestService = new GuestService();
    }

    public async execute(guestId: number, guestName: string): Promise<void> {
        const guest = await this.guestService.getGuestById(guestId);
        guest.guest_name = guestName;

        await this.guestService.updateGuest(guest);
    }
}
