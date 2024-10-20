import { Request, Response } from "express";
import { CustomError } from "../../../application/erros/CustomError";
import { ListPlayerFacade } from "../../../application/facade/organizer/ListPlayerFacade";
import { PlayerListRequest } from "../../requests/organizer/listPlayer/PlayerListRequest";

export class ListPlayerController {

    private readonly listPlayerFacade: ListPlayerFacade;

    constructor() {
        this.listPlayerFacade = new ListPlayerFacade();
    }

    public async getListPlayers(request: Request, response: Response) {
        try {
            const { userIdPk } = request;
            const { listId } = request.params;

            const playerListRequest: PlayerListRequest = {
                listId: Number(listId),
            };

            const lists = await this.listPlayerFacade.getPlayers(playerListRequest, Number(userIdPk));

            return response.status(200).json({ data: lists });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            console.error(message);
            return response.status(statusCode).json({ error: message });
        }
    }

    public async updateListPlayer(request: Request, response: Response) {
        try {
            const { userIdPk } = request;
            const { listPlayerId } = request.params;

            const playerListRequest: PlayerListRequest = {
                playerId: request.body.playerId,
                status: request.body.status,
                listId: Number(request.body.listId),
                playerListId: Number(listPlayerId)
            };

            await this.listPlayerFacade.updateListPlayer(playerListRequest, Number(userIdPk));
            return response.status(204);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async addPlayerMemberOnList(request: Request, response: Response) {
        try {
            const { userIdPk } = request;

            const playerListRequest: PlayerListRequest = {
                playerId: request.body.playerId,
                listId: request.body.listId,
                status: request.body.status,
            };

            await this.listPlayerFacade.addPlayer(playerListRequest, Number(userIdPk));
            return response.status(201).json();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async removePlayerMemberOnList(request: Request, response: Response) {
        try {
            const { userIdPk } = request;

            const playerListRequest: PlayerListRequest = {
                playerId: request.body.playerId,
                listId: request.body.listId,
                playerListId: request.body.playerListId,
                status: "DESISTENCIA"
            };

            await this.listPlayerFacade.removePlayer(playerListRequest, Number(userIdPk));

            return response.status(204).json();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async addGuestOnList(request: Request, response: Response) {
        try {
            const { userIdPk } = request;

            const playerListRequest: PlayerListRequest = {
                guestId: request.body.playerId,
                listId: request.body.listId,
                status: request.body.status,
            };

            await this.listPlayerFacade.addGuest(playerListRequest, Number(userIdPk));
            return response.status(201);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async removeGuestOnList(request: Request, response: Response) {
        try {
            const { userIdPk } = request;

            const playerListRequest: PlayerListRequest = {
                guestId: request.body.playerId,
                listId: request.body.listId,
                playerListId: request.body.playerListId,
            };

            await this.listPlayerFacade.removeGuest(playerListRequest, Number(userIdPk));

            return response.status(204);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

}
