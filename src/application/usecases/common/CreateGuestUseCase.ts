import { GuestEntity } from "../../../domain/entity/GuestEntity";
import { GuestService } from "../../services/GuestService";

export class CreateGuestUseCase {

    private readonly guestService: GuestService;

    constructor() {
        this.guestService = new GuestService();
    }

    public async execute(guestName: string, usersId: number): Promise<void> {
        const guestEntity = await GuestEntity.fromData({ guest_name: guestName, users_id: usersId });

        await this.guestService.registerGuest(guestEntity);
    }
}
