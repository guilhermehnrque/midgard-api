import { GuestService } from "../../services/GuestService";

export class GetGuestsUseCase {

    private readonly guestService: GuestService;

    constructor() {
        this.guestService = new GuestService();
    }

    public async execute(usersId: number): Promise<Object[]> {
        const guests = await this.guestService.getGuestsByHostId(usersId);

        return guests.map((guest) => ({ guestId: guest.id, guestName: guest.guest_name }));
    }
}
