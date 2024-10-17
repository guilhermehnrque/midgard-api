import { ScheduleEntity } from "../../../../domain/entity/ScheduleEntity";
import { SchedulesService } from "../../../services/ScheduleService";
import { UserService } from "../../../services/UserService";
import { OrganizerValidationService } from "../../../services/validation/OrganizerValidationService";

export class UpdateScheduleUseCase {

    private readonly userService: UserService;
    private readonly scheduleService: SchedulesService;
    private readonly organizerValidationService: OrganizerValidationService;

    constructor() {
        this.userService = new UserService();
        this.scheduleService = new SchedulesService();
        this.organizerValidationService = new OrganizerValidationService(); 
    }

    public async execute(scheduleId: number, userId: string, startingTime: string, endingTime: string, dayOfWeek: string, groupIdPk: number): Promise<void> {
        const user = await this.userService.getUserByUserId(userId);
        await this.organizerValidationService.validationOrganizerIsGroupOwner(user, groupIdPk);

        this.scheduleValidation(scheduleId, groupIdPk);

        const schedule = await ScheduleEntity.fromCreateUseCase({
            starting_time: startingTime,
            ending_time: endingTime,
            day_of_week: dayOfWeek,
            groups_id: groupIdPk
        });

        await this.scheduleService.createSchedule(schedule);
    }

    private async scheduleValidation(scheduleId: number, groupIdPk: number) {
        await this.scheduleService.getScheduleByIdAndGroupId(scheduleId, groupIdPk)
    }

}
