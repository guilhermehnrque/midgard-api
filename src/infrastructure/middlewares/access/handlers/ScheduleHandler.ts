
import { BaseOrganizer } from "../types/BaseOrganizer";
import { BaseOrganizerHandler } from "../BaseOrganizerHandler";
import { PermissionError } from "../../../../application/erros/PermissionError";
import { GroupService } from "../../../../application/services/GroupService";
import { SchedulesService } from "../../../../application/services/ScheduleService";

export class ScheduleHandler extends BaseOrganizerHandler {

    private readonly groupService: GroupService;
    private readonly schedulesService: SchedulesService;
    
    constructor() {
        super();
        this.groupService = new GroupService();
        this.schedulesService = new SchedulesService();
    }

    public async handle(request: BaseOrganizer): Promise<BaseOrganizer | null> {
        const schedule = await this.schedulesService.getScheduleById(request.scheduleId!);
        const group = await this.groupService.getGroupById(schedule.getGroupIdPk());

        if (group.getGroupOwner() !== request.userId) {
            throw new PermissionError();
        }

        return super.handle(request);
    }
}
