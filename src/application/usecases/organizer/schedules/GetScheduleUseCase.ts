import { ScheduleOutputDTO } from "../../../dto/organizer/schedule/ScheduleOutputDTO";
import { SchedulesService } from "../../../services/ScheduleService";

export class GetScheduleUseCase {

    private readonly scheduleService: SchedulesService;

    constructor() {
        this.scheduleService = new SchedulesService();
    }

    public async execute(scheduleIdPk: number, groupIdPk: number): Promise<ScheduleOutputDTO> {
        const schedules = await this.scheduleService.getScheduleByIdAndGroupId(scheduleIdPk, groupIdPk);

        return ScheduleOutputDTO.fromEntity(schedules);
    }

}
