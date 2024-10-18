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
            const { userId } = request;
            const createScheduleRequest = request.body as CreateScheduleRequest;

            await this.scheduleFacade.createSchedule(createScheduleRequest, userId!);

            return response.status(201).json({ message: "Schedule created successfully" });

        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async updateSchedule(request: Request, response: Response) {
        try {
            const { userId } = request;
            const { scheduleId } = request.params;
            const updateScheduleRequest = request.body as UpdateScheduleRequest;

            await this.scheduleFacade.updateSchedule(updateScheduleRequest, userId!, Number(scheduleId));

            return response.status(204).json({ message: "Schedule updated successfully" });

        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async getSchedules(request: Request, response: Response) {
        try {
            const { userId } = request;
            const { groupId } = request.params;

            const facade = await this.scheduleFacade.getSchedules(userId!, Number(groupId));

            return response.status(200).json({ data: facade });

        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }
    public async getSchedule(request: Request, response: Response) {
        try {
            const { userId } = request;
            const { groupId, scheduleId } = request.params;

            const facade = await this.scheduleFacade.getSchedule(userId!, Number(scheduleId), Number(groupId));

            return response.status(200).json(facade);

        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }


}