import { Request, Response } from "express";
import { ListPlayerFacade } from "../../../application/facade/player/ListPlayerFacade";
import { CustomError } from "../../../application/erros/CustomError";

export class ListMembershipController {
    
    private readonly listPlayerFacade: ListPlayerFacade;

    constructor() {
        this.listPlayerFacade = new ListPlayerFacade();
    }

    public async getJoinedLists(request: Request, response: Response): Promise<Response> {
        try {
            const userId = parseInt(request.params.userId);

            const joinedLists = await this.listPlayerFacade.getJoinedLists(userId);
            return response.status(200).json(joinedLists);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async getLists(request: Request, response: Response): Promise<Response> {
        try {
            const groupId = parseInt(request.params.groupId);

            const lists = await this.listPlayerFacade.getLists(groupId);
            return response.status(200).json(lists);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async joinList(request: Request, response: Response): Promise<Response> {
        try {
            const { userIdPk } = request.headers;
            const listId = parseInt(request.params.listId);

            await this.listPlayerFacade.joinList(Number(userIdPk!), listId);
            return response.status(200).json({ message: "Successfully joined the list" });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async leaveList(request: Request, response: Response): Promise<Response> {
        try {
            const userId = parseInt(request.params.userId);
            const listId = parseInt(request.params.listId);

            await this.listPlayerFacade.leaveList(userId, listId);
            return response.status(200).json({ message: "Successfully left the list" });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }
}
