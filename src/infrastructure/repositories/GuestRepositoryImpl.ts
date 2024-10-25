
import { CustomError } from "../../application/erros/CustomError";
import { DatabaseError } from "../../application/erros/DatabaseError";
import { GuestEntity } from "../../domain/entity/GuestEntity";
import { Guest } from "../../domain/models/GuestModel";
import { GuestRepositoryInterface } from "../../domain/repositories/GuestRepositoryInterface";

export class GuestRepositoryImpl implements GuestRepositoryInterface {

    async register(guestEntity: GuestEntity): Promise<void> {
        try {
            await Guest.create(guestEntity.createPayload());
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GuestRepositoryImpl] Error creating guest: ${customError.message}`);
        }
    }

    async delete(guestId: number): Promise<number> {
        try {
            return await Guest.destroy({ where: { id: guestId } });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GuestRepositoryImpl] Error deleting guest: ${customError.message}`);
        }
    }

    async getGuestById(guestId: number): Promise<Guest | null> {
        try {
            return await Guest.findByPk(guestId);
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GuestRepositoryImpl] Error getting guest by id: ${customError.message}`);
        }
    }

    public async getGuestByHostId(usersId: number): Promise<Guest[]> {
        try {
            return await Guest.findAll({ where: { users_id: usersId } });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GuestRepositoryImpl] Error getting guest by host id: ${customError.message}`);
        }
    }

    async updateGuestById(guestId: number, guestEntity: GuestEntity): Promise<number> {
        try {
            const [rowsAffected] = await Guest.update(guestEntity.updatePayload(), { where: { id: guestId } });
            return rowsAffected;
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GuestRepositoryImpl] Error updating guest by id: ${customError.message}`);
        }
    }

}
