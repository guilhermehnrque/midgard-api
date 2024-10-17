import { ListOutputDTO } from "../../../dto/organizer/list/ListOutputDTO";
import { GroupService } from "../../../services/GroupService";
import { ListBaseService } from "../../../services/ListBaseService";
import { UserService } from "../../../services/UserService";
import { OrganizerValidationService } from "../../../services/validation/OrganizerValidationService";

export class GetListsUseCase {

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

    public async execute(userId: string, groupIdPk: number): Promise<ListOutputDTO[]> {
        const user = await this.userService.getUserByUserId(userId);
        const group = await this.groupService.getGroupById(groupIdPk);

        await this.organizerValidationService.groupManagerAccess(user, group);

        const lists = await this.listBaseService.getListsByGroupId(groupIdPk);

        return ListOutputDTO.fromEntities(lists);
    }


}