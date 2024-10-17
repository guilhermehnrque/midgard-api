import { ScheduleOutputDTO } from "../../../dto/organizer/schedule/ScheduleOutputDTO";
import { SchedulesService } from "../../../services/ScheduleService";
import { UserService } from "../../../services/UserService";
import { OrganizerValidationService } from "../../../services/validation/OrganizerValidationService";

export class GetSchedulesUseCase {

    private readonly userService: UserService;
    private readonly scheduleService: SchedulesService;
    private readonly organizerValidationService: OrganizerValidationService;

    constructor() {
        this.userService = new UserService();
        this.scheduleService = new SchedulesService();
        this.organizerValidationService = new OrganizerValidationService(); 
    }

    public async execute(groupIdPk: number, userId: string): Promise<ScheduleOutputDTO[]> {
        const user = await this.userService.getUserByUserId(userId);
        await this.organizerValidationService.validationOrganizerIsGroupOwner(user, groupIdPk);

        const schedules = await this.scheduleService.getScheduleByGroupId(groupIdPk);

        return ScheduleOutputDTO.fromEntities(schedules);
    }

}
