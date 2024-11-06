import { GuestService } from "../../services/GuestService";

export class DeleteGuestUseCase {

    private readonly guestService: GuestService;

    constructor() {
        this.guestService = new GuestService();
    }

    public async execute(guestId: number): Promise<void> {
        await this.guestService.deleteGuest(guestId);
    }
}
