import { ScheduleEntity } from "../../../../domain/entity/ScheduleEntity";
import { SchedulesService } from "../../../services/ScheduleService";

export class UpdateScheduleUseCase {

    private readonly scheduleService: SchedulesService;

    constructor() {
        this.scheduleService = new SchedulesService();
    }

    public async execute(scheduleId: number, startingTime: string, endingTime: string, dayOfWeek: string, groupIdPk: number): Promise<void> {

        this.scheduleValidation(scheduleId, groupIdPk);

        const schedule = await ScheduleEntity.fromCreateUseCase({
            starting_time: startingTime,
            ending_time: endingTime,
            day_of_week: dayOfWeek,
            groups_id: groupIdPk
        });

        await this.scheduleService.updateSchedule(schedule);
    }

    private async scheduleValidation(scheduleId: number, groupIdPk: number) {
        await this.scheduleService.getScheduleByIdAndGroupId(scheduleId, groupIdPk)
    }

}
