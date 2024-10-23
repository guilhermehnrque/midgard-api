import { Request, Response } from "express";
import { LocalFacade } from "../../../application/facade/organizer/LocalFacade";
import { CreateLocalRequest } from "../../requests/organizer/local/CreateLocalRequest";
import { CustomError } from "../../../application/erros/CustomError";
import { UpdateLocalRequest } from "../../requests/organizer/local/UpdateLocalRequest";

export class LocalController {

    private readonly localFacade: LocalFacade;

    constructor() {
        this.localFacade = new LocalFacade();
    }

    public async createLocal(request: Request, response: Response) {
        try {
            const { userIdPk } = request;
            const createLocalRequest = request.body as CreateLocalRequest;

            await this.localFacade.createLocal(createLocalRequest, Number(userIdPk));
            return response.status(200).json();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async updateLocal(request: Request, response: Response) {
        try {
            const { userIdPk } = request;
            const { localId } = request.params;
            const updateLocalRequest = request.body as UpdateLocalRequest;

            await this.localFacade.updateLocal(updateLocalRequest, Number(userIdPk), Number(localId));
            return response.status(200).json();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async getLocals(request: Request, response: Response) {
        try {
            const { userIdPk } = request;
            const { groupId } = request.params;

            const locals = await this.localFacade.getLocals(Number(groupId), Number(userIdPk));
            return response.status(200).json({ data: locals });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async getLocal(request: Request, response: Response) {
        try {
            const { userIdPk } = request;
            const { localId } = request.params;

            const local = await this.localFacade.getLocal(Number(localId), Number(userIdPk));
            return response.status(200).json({ data: local });

        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

}
