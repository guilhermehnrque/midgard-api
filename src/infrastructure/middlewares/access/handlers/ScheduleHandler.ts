
import { BaseOrganizer } from "../types/BaseOrganizer";
import { BaseOrganizerHandler } from "../BaseOrganizerHandler";
import { SchedulesService } from "../../../../application/services/ScheduleService";

export class ScheduleHandler extends BaseOrganizerHandler {

    private readonly schedulesService: SchedulesService;
    
    constructor() {
        super();
        this.schedulesService = new SchedulesService();
    }

    public async handle(request: BaseOrganizer): Promise<BaseOrganizer | null> {
        const schedule = await this.schedulesService.getScheduleById(request.scheduleId!);
        
        request.groupId = schedule.groups_id;

        return super.handle(request);
    }
}
