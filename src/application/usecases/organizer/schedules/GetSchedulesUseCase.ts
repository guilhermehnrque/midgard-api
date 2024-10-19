import { ScheduleOutputDTO } from "../../../dto/organizer/schedule/ScheduleOutputDTO";
import { SchedulesService } from "../../../services/ScheduleService";

export class GetSchedulesUseCase {

    private readonly scheduleService: SchedulesService;

    constructor() {
        this.scheduleService = new SchedulesService();
    }

    public async execute(groupIdPk: number): Promise<ScheduleOutputDTO[]> {
        const schedules = await this.scheduleService.getSchedulesByGroupId(groupIdPk);

        return ScheduleOutputDTO.fromEntities(schedules);
    }

}
