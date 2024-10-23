

import { PermissionError } from "../../../../erros/PermissionError";
import { GroupService } from "../../../../services/GroupService";
import { SchedulesService } from "../../../../services/ScheduleService";
import { AbstractHandler } from "../../../AbstractHandler";
import { OrganizerTypeAccess } from "../../../types/OrganizerTypeAccess";

export class ScheduleAccessHandler extends AbstractHandler {

    private readonly groupService: GroupService;
    private readonly schedulesService: SchedulesService;
    
    constructor() {
        super();
        this.groupService = new GroupService();
        this.schedulesService = new SchedulesService();
    }

    public async handle(request: OrganizerTypeAccess): Promise<void> {
        const schedule = await this.schedulesService.getScheduleById(request.scheduleId!);
        const group = await this.groupService.getGroupById(schedule.getGroupIdPk());

        if (group.getGroupOwner() !== request.userId) {
            console.error(`[ScheduleAccessHandler] Access denied: User is not an organizer.`);
            throw new PermissionError("Access denied: User is not an organizer of the group.");
        }

        super.handle(request);
    }
}
