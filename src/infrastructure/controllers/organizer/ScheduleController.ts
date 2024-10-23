import { Request, Response } from "express";
import { SchedulesFacade } from "../../../application/facade/organizer/SchedulesFacade";
import { CreateScheduleRequest } from "../../requests/organizer/schedule/CreateScheduleRequest";
import { CustomError } from "../../../application/erros/CustomError";
import { UpdateScheduleRequest } from "../../requests/organizer/schedule/UpdateScheduleRequest";

export class ScheduleController {

    private readonly scheduleFacade: SchedulesFacade;

    constructor() {
        this.scheduleFacade = new SchedulesFacade();
    }

    public async createSchedule(request: Request, response: Response) {
        try {
            const { userIdPk } = request;
            const createScheduleRequest = request.body as CreateScheduleRequest;

            await this.scheduleFacade.createSchedule(createScheduleRequest, Number(userIdPk));

            return response.status(201).json();

        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async updateSchedule(request: Request, response: Response) {
        try {
            const { userIdPk } = request;
            const { scheduleId } = request.params;
            const updateScheduleRequest = request.body as UpdateScheduleRequest;

            await this.scheduleFacade.updateSchedule(updateScheduleRequest, Number(userIdPk), Number(scheduleId));

            return response.status(204).json();

        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async getSchedules(request: Request, response: Response) {
        try {
            const { userIdPk } = request;
            const { groupId } = request.params;

            const facade = await this.scheduleFacade.getSchedules(Number(userIdPk), Number(groupId));

            return response.status(200).json({ data: facade });

        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }
    public async getSchedule(request: Request, response: Response) {
        try {
            const { userIdPk } = request;
            const { scheduleId } = request.params;

            const facade = await this.scheduleFacade.getSchedule(Number(userIdPk), Number(scheduleId));

            return response.status(200).json(facade);

        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

}
