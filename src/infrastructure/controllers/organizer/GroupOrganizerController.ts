import { Request, Response } from "express";
import { GroupOrganizerFacade } from "../../../application/facade/organizer/GroupOrganizerFacade";
import { CustomError } from "../../../application/erros/CustomError";

export class GroupOrganizerController {

    private readonly groupOrganizerFacade = new GroupOrganizerFacade();

    constructor() { }

    public async includeOrganizer(request: Request, response: Response) {
        try {
            const { groupId, organizerId } = request.params;

            await this.groupOrganizerFacade.includeOrganizer(Number(groupId), Number(organizerId));

            return response.status(201).json();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async removeOrganizer(request: Request, response: Response) {
        try {
            const { groupId, organizerId } = request.params;

            await this.groupOrganizerFacade.removeOrganizer(Number(groupId), Number(organizerId));

            return response.status(204).json();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

}