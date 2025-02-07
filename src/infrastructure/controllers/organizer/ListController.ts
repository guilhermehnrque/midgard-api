import { Request, Response } from "express";
import { ListBaseFacade } from "../../../application/facade/organizer/ListBaseFacade";
import { CreateListRequest } from "../../requests/organizer/list/CreateListRequest";
import { CustomError } from "../../../application/erros/CustomError";

export class ListController {

    private readonly listBaseFacade: ListBaseFacade;

    constructor() {
        this.listBaseFacade = new ListBaseFacade();
    }

    public async createList(request: Request, response: Response) {
        try {
            const createListRequest = request.body as CreateListRequest;

            await this.listBaseFacade.createList(createListRequest);
            return response.status(201).json();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async updateList(request: Request, response: Response) {
        try {
            const { listId } = request.params;
            const updateListRequest = request.body;

            await this.listBaseFacade.updateList(updateListRequest, Number(listId));
            return response.status(204).json();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async getLists(request: Request, response: Response) {
        try {
            const { groupId } = request.params;

            const lists = await this.listBaseFacade.getLists(Number(groupId));

            return response.status(200).json({ data: lists });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            console.error(message);
            return response.status(statusCode).json({ error: message });
        }
    }

    public async getList(request: Request, response: Response) {
        try {
            const { listId } = request.params;

            const list = await this.listBaseFacade.getList(Number(listId));

            return response.status(200).json(list);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

}
