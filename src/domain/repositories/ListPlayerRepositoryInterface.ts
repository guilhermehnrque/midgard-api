import { ListPlayerEntity } from "../entity/ListPlayerEntity";
import { ListPlayer }from "../models/ListPlayerModel"

export interface ListPlayerInterface {
    registerPlayer(player: ListPlayerEntity): Promise<void>;
    updatePlayerStatus(listPlayerIdPk: number, status: string, userIdPk: number): Promise<number>;
    removePlayerFromList(listId: number, userIdPk: number): Promise<number>;
    removeGuestFromList(listId: number, guestIdPk: number): Promise<number>;
    getListPlayersByListId(listId: number): Promise<ListPlayer[]>;
    getPlayerInListByPlayerId(playerId: number): Promise<ListPlayer[] | null>;
    getGuestInListByGuestIdAndListId(guestId: number, listIdPk: number): Promise<ListPlayer | null>;
}