import { ListPlayerEntity } from "../../domain/entity/ListPlayerEntity";
import { ListPlayer } from "../../domain/models/ListPlayerModel";
import { ListPlayerRepositoryImpl } from "../../infrastructure/repositories/ListPlayerRepositoryImpl";
import { CustomError } from "../erros/CustomError";
import { InternalError } from "../erros/InternalError";

export class ListPlayerService {

    private readonly listPlayerRepository: ListPlayerRepositoryImpl;

    constructor() {
        this.listPlayerRepository = new ListPlayerRepositoryImpl();
    }

    public async addPlayerToList(playerEntity: ListPlayerEntity): Promise<void> {
        try {
            await this.listPlayerRepository.registerPlayer(playerEntity);
        } catch (error) {
            const customError = error as CustomError;
            this.logAndThrowError(new InternalError(), `[PlayersListService] addPlayerToList -> ${customError.message}`);
        }
    }

    public async updatePlayerStatus(playerEntity: ListPlayerEntity): Promise<number> {
        try {
            return await this.listPlayerRepository.updatePlayerStatus(playerEntity.id!, playerEntity.player_status, playerEntity.users_id!);
        } catch (error) {
            const customError = error as CustomError;
            this.logAndThrowError(new InternalError(), `[PlayersListService] addPlayerToList -> ${customError.message}`);
            return 0;
        }
    }

    public async removePlayerFromList(playerEntity: ListPlayerEntity): Promise<number> {
        try {
            return await this.listPlayerRepository.removePlayerFromList(playerEntity.id!, playerEntity.users_id!);
        } catch (error) {
            const customError = error as CustomError;
            this.logAndThrowError(new InternalError(), `[PlayersListService] removePlayerFromList -> ${customError.message}`);
            return 0;
        }
    }
    public async removeGuestFromList(playerEntity: ListPlayerEntity): Promise<number> {
        try {
            return await this.listPlayerRepository.removeGuestFromList(playerEntity.id!, playerEntity.guest_id!);
        } catch (error) {
            const customError = error as CustomError;
            this.logAndThrowError(new InternalError(), `[PlayersListService] removePlayerFromList -> ${customError.message}`);
            return 0;
        }
    }

    public async getListPlayersByListId(listIdPk: number): Promise<ListPlayerEntity[]> {
        const playerList = await this.listPlayerRepository.getListPlayersByListId(listIdPk);

        if (playerList == null || playerList.length == 0) {
            return [];
        }

        return Promise.all(playerList.map(this.createListPlayerEntityFromPersistence));
    }

    public async getPlayerInListByPlayerId(playerId: number): Promise<ListPlayerEntity[]> {
        const playerList = await this.listPlayerRepository.getPlayerInListByPlayerId(playerId);

        if (playerList == null || playerList.length == 0) {
            return [];
        }

        return Promise.all(playerList.map(this.createListPlayerEntityFromPersistence));
    }

    public async validatePlayerIsOnList(playerId: number, listIdPk: number): Promise<boolean> {
        const response = await this.listPlayerRepository.getPlayerInListByPlayerIdAndListId(playerId, listIdPk);
        return response !== null;
    }

    public async validateGuestIsOnList(playerId: number, listIdPk: number): Promise<boolean> {
        const response = await this.listPlayerRepository.getGuestInListByGuestIdAndListId(playerId, listIdPk);
        return response !== null;
    }

    private async createListPlayerEntityFromPersistence(listPlayer: ListPlayer): Promise<ListPlayerEntity> {
        return ListPlayerEntity.fromPersistence({
            id: listPlayer.id,
            list_base_id: listPlayer.list_base_id,
            player_status: listPlayer.player_status,
            users_id: listPlayer.users_id,
            guest_id: listPlayer.guest_id,
            created_at: listPlayer.created_at,
            updated_at: listPlayer.updated_at,
        });
    }

    private logAndThrowError(error: CustomError, context: string): void {
        console.error(`${context}: ${error.message}`);
        throw error;
    }

}