import { GroupDetailOutputDTO } from "../../../dto/player/group/GroupDetailOutputDTO";
import { GroupService } from "../../../services/GroupService";
import { LocalService } from "../../../services/LocalService";
import { SchedulesService } from "../../../services/ScheduleService";

export class GroupDetailsUseCase {

    private readonly groupService: GroupService;
    private readonly schedulesService: SchedulesService;
    private readonly localService: LocalService;

    constructor() {
        this.groupService = new GroupService();
        this.schedulesService = new SchedulesService();
        this.localService = new LocalService();
    }

    public async execute(groupId: number): Promise<Object> {
        const group = await this.getGroup(groupId);
        const locals = await this.getLocals(groupId);
        const schedules = await this.getSchedules(groupId);

        const output = GroupDetailOutputDTO.fromEntities(group, schedules, locals);

        return output.toObject();
    }

    private async getGroup(groupId: number) {
        return await this.groupService.getGroupById(groupId);
    }

    private async getLocals(groupId: number) {
        return await this.localService.getLocalsByGroupId(groupId);
    }

    private async getSchedules(groupId: number) {
        return await this.schedulesService.getSchedulesByGroupId(groupId);
    }

}