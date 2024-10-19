import { Request, Response } from "express";
import { CustomError } from "../../../application/erros/CustomError";
import { GroupPlayerFacade } from "../../../application/facade/player/GroupPlayerFacade";
import { JoinGroupRequest } from "../../requests/player/group/JoinGroupRequest";

export class GroupMembershipController {

    private readonly groupPlayerFacade: GroupPlayerFacade;

    constructor() {
        this.groupPlayerFacade = new GroupPlayerFacade();
    }

    public async joinGroup(request: Request, response: Response) {
        try {
            const { userIdPk } = request;
            const joinGroupRequest = request.body as JoinGroupRequest;

            await this.groupPlayerFacade.joinGroup(joinGroupRequest, userIdPk!);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async leaveGroup(request: Request, response: Response) {
        try {
            const { userIdPk } = request;
            const { groupIdPk } = request.params;

            await this.groupPlayerFacade.leaveGroup(Number(groupIdPk), userIdPk!);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });

        }
    }

    public async getGroups(request: Request, response: Response) {
        try {
            const members = await this.groupPlayerFacade.getGroups();

            return response.status(200).json({ data: members });

        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async getGroupMembership(request: Request, response: Response) {
        try {
            const { userIdPk } = request;

            const group = await this.groupPlayerFacade.getGroupMemberships(userIdPk!);

            return response.status(200).json({ data: group });

        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async getGroupDetails(request: Request, response: Response) {
        try {
            const { userIdPk } = request;
            const { groupIdPk } = request.params;

            const group = await this.groupPlayerFacade.getGroupDetails(Number(groupIdPk), userIdPk!);

            return response.status(200).json({ data: group });

        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

}