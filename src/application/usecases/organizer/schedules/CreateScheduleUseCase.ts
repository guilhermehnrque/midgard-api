import { ScheduleEntity } from "../../../../domain/entity/ScheduleEntity";
import { ScheduleAlreadyExistsError } from "../../../erros/schedules/ScheduleAlreadyExistsError";
import { SchedulesService } from "../../../services/ScheduleService";

export class CreateScheduleUseCase {

    private readonly scheduleService: SchedulesService;

    constructor() {
        this.scheduleService = new SchedulesService();
    }

    public async execute(startingTime: string, endingTime: string, dayOfWeek: string, groupIdPk: number): Promise<void> {

        await this.scheduleValidation(startingTime, endingTime, dayOfWeek, groupIdPk);

        const schedule = await ScheduleEntity.fromCreateUseCase({
            starting_time: startingTime,
            ending_time: endingTime,
            day_of_week: dayOfWeek,
            groups_id: groupIdPk

        });

        await this.scheduleService.createSchedule(schedule);
    }

    private async scheduleValidation(startingTime: string, endingTime: string, dayOfWeek: string, groupIdPk: number) {
        const schedule = await this.scheduleService.getScheduleByTimesAndGroupId(startingTime, endingTime, dayOfWeek, groupIdPk)

        if (schedule) {
            console.error(`[CreateScheduleUseCase] -> Schedule already exists`);
            throw new ScheduleAlreadyExistsError();
        }
    }

}
