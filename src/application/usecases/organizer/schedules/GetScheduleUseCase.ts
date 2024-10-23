import { ScheduleOutputDTO } from "../../../dto/organizer/schedule/ScheduleOutputDTO";
import { SchedulesService } from "../../../services/ScheduleService";

export class GetScheduleUseCase {

    private readonly scheduleService: SchedulesService;

    constructor() {
        this.scheduleService = new SchedulesService();
    }

    public async execute(scheduleIdPk: number): Promise<ScheduleOutputDTO> {
        const schedules = await this.scheduleService.getScheduleById(scheduleIdPk);

        return ScheduleOutputDTO.fromEntity(schedules);
    }

}
