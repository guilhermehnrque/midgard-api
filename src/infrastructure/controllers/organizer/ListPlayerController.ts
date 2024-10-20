import { Request, Response } from "express";
import { CustomError } from "../../../application/erros/CustomError";
import { ListPlayerFacade } from "../../../application/facade/organizer/ListPlayerFacade";
import { PlayerListRequest } from "../../requests/organizer/listPlayer/PlayerListRequest";

export class ListPlayerController {

    private readonly listPlayerFacade: ListPlayerFacade;

    constructor() {
        this.listPlayerFacade = new ListPlayerFacade();
    }
    public async addMemberOnList(request: Request, response: Response) {
        try {
            const { userIdPk } = request;

            const playerListRequest: PlayerListRequest = {
                playerId: request.body.playerId,
                listId: request.body.listId
            };

            await this.listPlayerFacade.addPlayer(playerListRequest, Number(userIdPk));
            return response.status(201).json();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async updateList(request: Request, response: Response) {
        try {
            const { userIdPk } = request;
            const { listId } = request.params;
            const updateListRequest = request.body;

            await this.listBaseFacade.updateList(updateListRequest, Number(listId), Number(userIdPk));
            return response.status(204).json();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async getLists(request: Request, response: Response) {
        try {
            const { userIdPk } = request;
            const { groupId } = request.params;

            const lists = await this.listBaseFacade.getLists(Number(groupId), Number(userIdPk));

            return response.status(200).json({ data: lists });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            console.error(message);
            return response.status(statusCode).json({ error: message });
        }
    }

    public async getList(request: Request, response: Response) {
        try {
            const { userIdPk } = request;
            const { listId, groupId } = request.params;

            const list = await this.listBaseFacade.getList(Number(listId), Number(groupId), Number(userIdPk));

            return response.status(200).json({ data: list });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

}
