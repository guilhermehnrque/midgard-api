import { GuestEntity } from "../../domain/entity/GuestEntity";
import { GuestRepositoryImpl } from "../../infrastructure/repositories/GuestRepositoryImpl";
import { GuestNotFoundError } from "../erros/guests/GuestNotFoundError";

export class GuestService {

    private readonly guestRepository: GuestRepositoryImpl;

    constructor() {
        this.guestRepository = new GuestRepositoryImpl();
    }

    public async getGuestById(guestId: number): Promise<GuestEntity> {
        const guest = await this.guestRepository.getGuestById(guestId);

        if (!guest || guest == null) {
            throw new GuestNotFoundError();
        }

        return await GuestEntity.fromData(guest);
    }

    public async registerGuest(guest: GuestEntity): Promise<void> {
        await this.guestRepository.register(guest);
    }

    public async updateGuest(guest: GuestEntity): Promise<number> {
        return await this.guestRepository.updateGuestById(guest.id!, guest);
    }

    public async deleteGuest(guestId: number): Promise<number> {
        return await this.guestRepository.delete(guestId);
    }

}