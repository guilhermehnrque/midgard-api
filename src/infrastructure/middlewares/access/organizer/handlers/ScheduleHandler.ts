import { ScheduleNotFoundError } from "../../../../../application/erros/schedules/ScheduleNotFoundError";
import { SchedulesService } from "../../../../../application/services/ScheduleService";
import { AbstractOrganizerHandler } from "../AbstractOrganizerHandler";
import { OrganizerDomain } from "../types/OrganizerDomain";

export class ScheduleHandler extends AbstractOrganizerHandler {

    private readonly schedulesService: SchedulesService;
    
    constructor() {
        super();
        this.schedulesService = new SchedulesService();
    }

    public async handle(request: OrganizerDomain): Promise<OrganizerDomain | null> {
        const schedule = await this.schedulesService.getScheduleById(request.scheduleId!);
        
        if (schedule == null) {
            throw new ScheduleNotFoundError();
        }

        request.groupId = schedule.groups_id;

        return super.handle(request);
    }
}
