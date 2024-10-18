import { Request, Response } from "express";
import { GroupFacade } from "../../../application/facade/organizer/GroupFacade";
import { CreateGroupRequest } from "../../requests/organizer/groups/CreateGroupRequest";
import { CustomError } from "../../../application/erros/CustomError";
import { UpdateGroupRequest } from "../../requests/organizer/groups/UpdateGroupRequest";

export class GroupController {

    private readonly groupFacade: GroupFacade;

    constructor() {
        this.groupFacade = new GroupFacade();
    }

    public async createGroup(request: Request, response: Response) {
        try {
            const { userId } = request;
            const CreateGroupRequest = request.body as CreateGroupRequest;

            await this.groupFacade.createGroup(CreateGroupRequest, userId!);
            return response.status(201).json();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async updateGroup(request: Request, response: Response) {
        try {
            const { userId } = request;
            const { groupId } = request.params;
            const updateGroupRequest = request.body as UpdateGroupRequest;

            await this.groupFacade.updateGroup(updateGroupRequest, userId!, Number(groupId));
            return response.status(204).json();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async getGroup(request: Request, response: Response) {
        try {
            const { userId } = request;
            const { groupId } = request.params;

            const facade = await this.groupFacade.getGroup(userId!, Number(groupId));

            return response.status(200).json({ data: facade });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async getGroups(request: Request, response: Response) {
        try {
            const { userId } = request;

            const facade = await this.groupFacade.getGroups(userId!);

            return response.status(200).json({ data: facade });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

}