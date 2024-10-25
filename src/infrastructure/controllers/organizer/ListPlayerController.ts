import { Request, Response } from "express";
import { CustomError } from "../../../application/erros/CustomError";
import { ListPlayerFacade } from "../../../application/facade/organizer/ListPlayerFacade";
import { PlayerListRequest } from "../../requests/organizer/listPlayer/PlayerListRequest";

export class ListPlayerController {

    private readonly listPlayerFacade: ListPlayerFacade;

    constructor() {
        this.listPlayerFacade = new ListPlayerFacade();
    }

    public async getListPlayers(request: Request, response: Response): Promise<Response> {
        try {
            const { listId } = request.params;

            const playerListRequest: PlayerListRequest = {
                listId: Number(listId),
            };

            const lists = await this.listPlayerFacade.getPlayers(playerListRequest);

            return response.status(200).json({ data: lists });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            console.error(message);
            return response.status(statusCode).json({ error: message });
        }
    }

    public async updateListPlayer(request: Request, response: Response): Promise<Response> {
        try {
            const { listId } = request.params;

            const playerListRequest: PlayerListRequest = {
                playerId: request.body.playerId,
                status: request.body.status,
                listId: Number(listId)
            };

            await this.listPlayerFacade.updateListPlayer(playerListRequest);
            return response.status(204).json();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async addPlayerMemberOnList(request: Request, response: Response): Promise<Response> {
        try {
            const playerListRequest: PlayerListRequest = {
                playerId: request.body.playerId,
                listId: request.body.listId,
                status: request.body.status,
            };

            await this.listPlayerFacade.addPlayer(playerListRequest);
            return response.status(201).json();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async removePlayerMemberOnList(request: Request, response: Response): Promise<Response> {
        try {
            const { listId, playerId } = request.params;

            await this.listPlayerFacade.removePlayer(Number(listId), Number(playerId));

            return response.status(204).json();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async addGuestOnList(request: Request, response: Response): Promise<Response> {
        try {
            const playerListRequest: PlayerListRequest = {
                guestId: request.body.playerId,
                listId: request.body.listId,
                status: request.body.status,
            };

            await this.listPlayerFacade.addGuest(playerListRequest);
            return response.status(201);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async removeGuestOnList(request: Request, response: Response): Promise<Response> {
        try {

            const playerListRequest: PlayerListRequest = {
                guestId: request.body.playerId,
                listId: request.body.listId,
                playerListId: request.body.playerListId,
            };

            await this.listPlayerFacade.removeGuest(playerListRequest);

            return response.status(204);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

}
