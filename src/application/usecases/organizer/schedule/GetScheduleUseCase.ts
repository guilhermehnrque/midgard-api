import { ScheduleOutputDTO } from "../../../dto/organizer/schedule/ScheduleOutputDTO";
import { SchedulesService } from "../../../services/ScheduleService";
import { UserService } from "../../../services/UserService";
import { OrganizerValidationService } from "../../../services/validation/OrganizerValidationService";

export class GetScheduleUseCase {

    private readonly userService: UserService;
    private readonly scheduleService: SchedulesService;
    private readonly organizerValidationService: OrganizerValidationService;

    constructor() {
        this.userService = new UserService();
        this.scheduleService = new SchedulesService();
        this.organizerValidationService = new OrganizerValidationService();
    }

    public async execute(scheduleIdPk: number, userId: string, groupIdPk: number): Promise<ScheduleOutputDTO> {
        const user = await this.userService.getUserByUserId(userId);
        await this.organizerValidationService.validationOrganizerIsGroupOwner(user, groupIdPk);

        const schedules = await this.scheduleService.getScheduleByIdAndGroupId(scheduleIdPk, groupIdPk);

        return ScheduleOutputDTO.fromEntity(schedules);
    }

}
