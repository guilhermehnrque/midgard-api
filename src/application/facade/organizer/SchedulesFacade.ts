import { CreateScheduleRequest } from "../../../infrastructure/requests/organizer/schedule/CreateScheduleRequest";
import { UpdateScheduleRequest } from "../../../infrastructure/requests/organizer/schedule/UpdateScheduleRequest";
import { ScheduleOutputDTO } from "../../dto/organizer/schedule/ScheduleOutputDTO";
import { CreateScheduleUseCase } from "../../usecases/organizer/schedules/CreateScheduleUseCase";
import { GetSchedulesUseCase } from "../../usecases/organizer/schedules/GetSchedulesUseCase";
import { GetScheduleUseCase } from "../../usecases/organizer/schedules/GetScheduleUseCase";
import { UpdateScheduleUseCase } from "../../usecases/organizer/schedules/UpdateScheduleUseCase";

export class SchedulesFacade {

    private readonly createScheduleUseCase: CreateScheduleUseCase;
    private readonly updateScheduleUseCase: UpdateScheduleUseCase;
    private readonly getScheduleUseCase: GetScheduleUseCase;
    private readonly getSchedulesUseCase: GetSchedulesUseCase;

    constructor() {
        this.createScheduleUseCase = new CreateScheduleUseCase();
        this.updateScheduleUseCase = new UpdateScheduleUseCase();
        this.getScheduleUseCase = new GetScheduleUseCase();
        this.getSchedulesUseCase = new GetSchedulesUseCase();
    }

    public async createSchedule(request: CreateScheduleRequest): Promise<void> {
        const { startTime, endTime, dayOfWeek, groupId, localId } = request;

        await this.createScheduleUseCase.execute(startTime, endTime, dayOfWeek, groupId, localId);
    }

    public async updateSchedule(request: UpdateScheduleRequest, scheduleIdPk: number): Promise<void> {
        const { startTime, endTime, dayOfWeek, groupId, localId } = request;

        await this.updateScheduleUseCase.execute(scheduleIdPk, startTime, endTime, dayOfWeek, groupId, localId);
    }

    public async getSchedules(groupId: number): Promise<ScheduleOutputDTO[]> {
        return await this.getSchedulesUseCase.execute(groupId);
    }

    public async getSchedule(scheduleIdPk: number): Promise<ScheduleOutputDTO> {
        return await this.getScheduleUseCase.execute(scheduleIdPk);
    }

}
