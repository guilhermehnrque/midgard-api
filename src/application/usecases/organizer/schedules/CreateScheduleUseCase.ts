import { ScheduleEntity } from "../../../../domain/entity/ScheduleEntity";
import { ScheduleAlreadyExistsError } from "../../../erros/schedules/ScheduleAlreadyExistsError";
import { SchedulesService } from "../../../services/ScheduleService";

export class CreateScheduleUseCase {

    private readonly scheduleService: SchedulesService;

    constructor() {
        this.scheduleService = new SchedulesService();
    }

    public async execute(startingTime: string, endingTime: string, dayOfWeek: string, groupIdPk: number, localIdPk: number): Promise<void> {

        await this.checkScheduleConflict(startingTime, endingTime, dayOfWeek);

        const schedule = await ScheduleEntity.fromCreateUseCase({
            starting_time: startingTime,
            ending_time: endingTime,
            day_of_week: dayOfWeek,
            groups_id: groupIdPk,
            locals_id: localIdPk
        });

        await this.scheduleService.createSchedule(schedule);
    }

    private async checkScheduleConflict(startingTime: string, endingTime: string, dayOfWeek: string) {
        const schedule = await this.scheduleService.checkScheduleConflictOnDay(dayOfWeek, startingTime, endingTime)

        if (schedule) {
            throw new ScheduleAlreadyExistsError();
        }
    }

}
