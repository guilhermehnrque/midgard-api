import { Request, Response } from "express";
import { GuestFacade } from "../../../application/facade/common/GuestFacade";
import { CustomError } from "../../../application/erros/CustomError";

export class GuestController {

    private readonly guestFacade: GuestFacade;

    constructor() {
        this.guestFacade = new GuestFacade();
    }

    public async createGuest(request: Request, response: Response) {

        try {
            const { guestName, usersId } = request.body;
            await this.guestFacade.createGuest(guestName, usersId);

            response.status(201).send();
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }

    }

    public async getGuests(request: Request, response: Response) {
        try {
            const { usersId } = request.body;
            const guests = await this.guestFacade.getGuests(usersId);
            return response.status(200).json({ data: guests });
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async updateGuest(request: Request, response: Response) {
        try {
            const { guestId } = request.params;
            const { guestName } = request.body;
            await this.guestFacade.updateGuest(Number(guestId), guestName);
            response.status(204).send();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async deleteGuest(request: Request, response: Response) {
        try {
            const { guestId } = request.params;
            await this.guestFacade.deleteGuest(Number(guestId));
            response.status(204).send();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

}
