import { CustomError } from "../../application/erros/CustomError";
import { DatabaseError } from "../../application/erros/DatabaseError";
import { ListPlayerInterface } from "../../domain/repositories/ListPlayerRepositoryInterface";
import { ListPlayer } from "../../domain/models/ListPlayerModel";
import { ListPlayerEntity } from "../../domain/entity/ListPlayerEntity";

export class ListPlayerRepositoryImpl implements ListPlayerInterface {

    async registerPlayer(player: ListPlayerEntity): Promise<void> {
        try {
            await ListPlayer.create(player.createPayload());
        } catch (error) {
            const customError = error as CustomError
            throw new DatabaseError(`[ListPlayerRepositoryImpl] registerPlayer ->  ${customError.message}`);
        }
    }

    async updatePlayerStatus(status: string, userIdPk: number): Promise<number> {
        try {
            const [affectedCount] = await ListPlayer.update({ player_status: status }, {
                where: { id: userIdPk }
            });

            return affectedCount;
        } catch (error) {
            const customError = error as CustomError
            throw new DatabaseError(`[ListPlayerRepositoryImpl] updatePlayerStatus -> ${customError.message}`);
        }
    }

    async removePlayerFromList(listId: number, userIdPk: number): Promise<number> {
        try {
            const affectedCount = await ListPlayer.destroy({
                where: { id: listId, users_id: userIdPk }
            });

            return affectedCount;
        } catch (error) {
            const customError = error as CustomError
            throw new DatabaseError(`[ListPlayerRepositoryImpl] removePlayerFromList -> ${customError.message}`);
        }
    }

    async removeGuestFromList(listId: number, guestIdPk: number): Promise<number> {
        try {
            const affectedCount = await ListPlayer.destroy({
                where: { id: listId, guest_id: guestIdPk }
            });

            return affectedCount;
        } catch (error) {
            const customError = error as CustomError
            throw new DatabaseError(`[ListPlayerRepositoryImpl] removePlayerFromList -> ${customError.message}`);
        }
    }

    async getListPlayersByListId(listId: number): Promise<ListPlayer[]> {
        try {
            return await ListPlayer.findAll({
                where: {
                    list_base_id: listId
                },
            });
        } catch (error) {
            const customError = error as CustomError
            throw new DatabaseError(`[ListPlayerRepositoryImpl] getListPlayersByListId -> ${customError.message}`);
        }
    }

    async getPlayerInListByPlayerId(playerId: number): Promise<ListPlayer | null> {
        try {
            return await ListPlayer.findOne({
                where: {
                    users_id: playerId
                },
            });
        } catch (error) {
            const customError = error as CustomError
            throw new DatabaseError(`[ListPlayerRepositoryImpl] getPlayerInListByPlayerId -> ${customError.message}`);
        }
    }

    async countPlayersInList(listId: number): Promise<number> {
        try {
            const result = await ListPlayer.count({
                where: {
                    list_base_id: listId
                },
                group: ['users_id', 'guests_id']
            });
    
            const total = Array.isArray(result) ? result.reduce((sum, group) => sum + group.count, 0) : 0;
    
            return total;
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[ListPlayerRepositoryImpl] countPlayersInList -> ${customError.message}`);
        }
    }

}