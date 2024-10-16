import { ListPlayerEntity } from "../../domain/entity/ListPlayerEntity";
import { ListPlayer } from "../../domain/models/ListPlayerModel";
import { ListPlayerRepositoryImpl } from "../../infrastructure/repositories/ListPlayerRepositoryImpl";
import { CustomError } from "../erros/CustomError";
import { PlayerAlreadyInListError } from "../erros/list/ListBaseErrors";

export class PlayersListService {

    private readonly listPlayerRepository: ListPlayerRepositoryImpl;

    constructor() {
        this.listPlayerRepository = new ListPlayerRepositoryImpl();
    }

    public async addPlayerToList(playerEntity: ListPlayerEntity): Promise<void> {
        await this.listPlayerRepository.registerPlayer(playerEntity);
    }

    public async updatePlayerStatus(playerEntity: ListPlayerEntity): Promise<number> {
        return await this.listPlayerRepository.updatePlayerStatus(playerEntity.player_status, playerEntity.users_id!);
    }

    public async removePlayerFromList(playerEntity: ListPlayerEntity): Promise<number> {
        return await this.listPlayerRepository.removePlayerFromList(playerEntity.id!, playerEntity.users_id!);
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

    public async countPlayersInList(listIdPk: number): Promise<number> {
        return await this.listPlayerRepository.countPlayersInList(listIdPk);
    }

    public async validatePlayerIsInList(playerId: number, listIdPk: number): Promise<void> {
        const response = await this.listPlayerRepository.getPlayerInListByPlayerIdAndListId(playerId, listIdPk);

        if (response != null) {
            this.logAndThrowError(new PlayerAlreadyInListError(), `[PlayersListService] validatePlayerIsInList -> ${playerId}`);
        }

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