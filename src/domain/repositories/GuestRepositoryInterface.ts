
import { GuestEntity } from "../../domain/entity/GuestEntity";
import { Guest } from "../../domain/models/GuestModel";

export interface GuestRepositoryInterface {
    register(GuestEntity: GuestEntity): Promise<void>;
    delete(guestId: number): Promise<number>;
    getGuestById(guestId: number): Promise<Guest | null>;
    getGuestByHostId(usersId: number): Promise<Guest[]>;
    updateGuestById(guestId: number, guestEntity: GuestEntity): Promise<number>;
}