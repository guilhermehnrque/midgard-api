import { ListBaseEntity } from "../../../../domain/entity/ListBaseEntity";
import { ListDTO } from "../../../dto/organizer/list/ListDTO";
import { GroupService } from "../../../services/GroupService";
import { ListBaseService } from "../../../services/ListBaseService";
import { UserService } from "../../../services/UserService";
import { OrganizerValidationService } from "../../../services/validation/OrganizerValidationService";

export class UpdateListUseCae {

    private readonly userService: UserService;
    private readonly listBaseService: ListBaseService;
    private readonly groupService: GroupService;

    private readonly organizerValidationService: OrganizerValidationService;

    constructor() {
        this.userService = new UserService();
        this.listBaseService = new ListBaseService();
        this.groupService = new GroupService();
        this.organizerValidationService = new OrganizerValidationService();
    }

    public async execute(userId: string, listIdPk: number, listDTO: ListDTO): Promise<number> {
        const user = await this.userService.getUserByUserId(userId);
        await this.validateListExists(listIdPk);

        const list = await this.listBaseService.getList(listIdPk);
        const group = await this.groupService.getGroupById(list.groups_id);

        await this.organizerValidationService.groupManagerAccess(user, group);

        const listEntity = await ListBaseEntity.fromUpdateUseCase({
            id: listIdPk,
            status: listDTO.status,
            player_limit: listDTO.playerLimit,
            starting_time: listDTO.startingTime,
            ending_time: listDTO.endingTime,
            day_of_week: listDTO.dayOfWeek,
            groups_id: listDTO.groupId,
            locals_id: listDTO.localId
        });

        return await this.listBaseService.updateList(listEntity);
    }

    private async validateListExists(listIdPk: number) {
        await this.listBaseService.getList(listIdPk);
    }

}