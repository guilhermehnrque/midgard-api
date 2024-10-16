import { CreateScheduleRequest } from "../../../infrastructure/requests/organizer/schedule/CreateScheduleRequest";
import { UpdateScheduleRequest } from "../../../infrastructure/requests/organizer/schedule/UpdateScheduleRequest";
import { ScheduleOutputDTO } from "../../dto/organizer/schedule/ScheduleOutputDTO";
import { OrganizerAccessService } from "../../services/validation/OrganizerAccessService";
import { CreateScheduleUseCase } from "../../usecases/organizer/schedules/CreateScheduleUseCase";
import { GetSchedulesUseCase } from "../../usecases/organizer/schedules/GetSchedulesUseCase";
import { GetScheduleUseCase } from "../../usecases/organizer/schedules/GetScheduleUseCase";
import { UpdateScheduleUseCase } from "../../usecases/organizer/schedules/UpdateScheduleUseCase";

export class SchedulesFacade {

    private readonly organizerAccessService: OrganizerAccessService;
    private readonly createScheduleUseCase: CreateScheduleUseCase;
    private readonly updateScheduleUseCase: UpdateScheduleUseCase;
    private readonly getScheduleUseCase: GetScheduleUseCase;
    private readonly getSchedulesUseCase: GetSchedulesUseCase;

    constructor() {
        this.organizerAccessService = new OrganizerAccessService();
        this.createScheduleUseCase = new CreateScheduleUseCase();
        this.updateScheduleUseCase = new UpdateScheduleUseCase();
        this.getScheduleUseCase = new GetScheduleUseCase();
        this.getSchedulesUseCase = new GetSchedulesUseCase();
    }

    public async createSchedule(request: CreateScheduleRequest, userId: string): Promise<void> {
        const { startTime, endTime, dayOfWeek, groupId } = request;
        await this.organizerAccessService.validateAccess({ userId, groupId });

        await this.createScheduleUseCase.execute(startTime, endTime, dayOfWeek, groupId);
    }

    public async updateSchedule(request: UpdateScheduleRequest, userId: string, scheduleIdPk: number): Promise<void> {
        const { startTime, endTime, dayOfWeek, groupId } = request;
        await this.organizerAccessService.validateAccess({ userId, groupId });

        await this.updateScheduleUseCase.execute(scheduleIdPk, startTime, endTime, dayOfWeek, groupId);
    }

    public async getSchedules(userId: string, groupId: number): Promise<ScheduleOutputDTO[]> {
        await this.organizerAccessService.validateAccess({ userId, groupId });

        return await this.getSchedulesUseCase.execute(groupId);
    }

    public async getSchedule(userId: string, scheduleIdPk: number, groupIdPk: number): Promise<ScheduleOutputDTO> {
        await this.organizerAccessService.validateAccess({ userId, groupId: groupIdPk });

        return await this.getScheduleUseCase.execute(scheduleIdPk, groupIdPk);
    }


}