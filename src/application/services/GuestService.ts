import { GuestEntity } from "../../domain/entity/GuestEntity";
import { GuestRepositoryImpl } from "../../infrastructure/repositories/GuestRepositoryImpl";
import { CustomError } from "../erros/CustomError";
import { GuestNotFoundError } from "../erros/guests/GuestNotFoundError";
import { InternalError } from "../erros/InternalError";

export class GuestService {

    private readonly guestRepository: GuestRepositoryImpl;

    constructor() {
        this.guestRepository = new GuestRepositoryImpl();
    }

    public async registerGuest(guest: GuestEntity): Promise<void> {
        try {
            await this.guestRepository.register(guest);
        } catch (error) {
            const customError = error as CustomError;
            console.error(`Error registering guest: ${customError.message}`)
            throw new InternalError();
        }
    }

    public async getGuestById(guestId: number): Promise<GuestEntity> {
        const guest = await this.guestRepository.getGuestById(guestId);

        if (!guest || guest == null) {
            throw new GuestNotFoundError();
        }

        return await GuestEntity.fromData(guest);
    }

    public async updateGuest(guest: GuestEntity): Promise<number> {
        try {
            return await this.guestRepository.updateGuestById(guest.id!, guest);
        } catch (error) {
            const customError = error as CustomError;
            console.error(`Error registering guest: ${customError.message}`)
            throw new InternalError();
        }
    }

    public async deleteGuest(guestId: number): Promise<number> {
        try {
            return await this.guestRepository.delete(guestId);
        } catch (error) {
            const customError = error as CustomError;
            console.error(`Error registering guest: ${customError.message}`)
            throw new InternalError();
        }
    }

}