import { ScheduleOutputDTO } from "../../../dto/organizer/schedule/ScheduleOutputDTO";
import { SchedulesService } from "../../../services/ScheduleService";
import { ScheduleEntity } from "../../../../domain/entity/ScheduleEntity";
import { ScheduleNotFoundError } from "../../../erros/schedules/ScheduleNotFoundError";

export class GetScheduleUseCase {

    private readonly scheduleService: SchedulesService;

    constructor() {
        this.scheduleService = new SchedulesService();
    }

    public async execute(scheduleIdPk: number): Promise<ScheduleOutputDTO> {
        const schedules = await this.scheduleService.getScheduleById(scheduleIdPk);
        
        await this.checkShedule(schedules);

        return ScheduleOutputDTO.fromEntity(schedules!);
    }

    private async checkShedule(scheduleEntity: ScheduleEntity | null): Promise<void> {
        if (scheduleEntity == null) {
            throw new ScheduleNotFoundError();
        }
    }

}
