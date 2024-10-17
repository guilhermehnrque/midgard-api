import { ScheduleEntity } from "../../../../domain/entity/ScheduleEntity";
import { SchedulesService } from "../../../services/ScheduleService";

export class CreateScheduleUseCase {

    private readonly scheduleService: SchedulesService;

    constructor() {
        this.scheduleService = new SchedulesService();
    }

    public async execute(startingTime: string, endingTime: string, dayOfWeek: string, groupIdPk: number): Promise<void> {

        this.scheduleValidation(startingTime, endingTime, dayOfWeek, groupIdPk);

        const schedule = await ScheduleEntity.fromCreateUseCase({
            starting_time: startingTime,
            ending_time: endingTime,
            day_of_week: dayOfWeek,
            groups_id: groupIdPk

        });

        await this.scheduleService.createSchedule(schedule);
    }

    private async scheduleValidation(startingTime: string, endingTime: string, dayOfWeek: string, groupIdPk: number) {
        await this.scheduleService.getScheduleByTimesAndGroupId(startingTime, endingTime, dayOfWeek, groupIdPk)
    }

}
