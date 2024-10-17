import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { GroupVisibilityHelper } from "../../../enums/GroupVisibilitEnum";
import { SportTypeHelper } from "../../../enums/SportTypeEnum";
import { GroupService } from "../../../services/GroupService";
import { UserService } from "../../../services/UserService";
import { OrganizerValidationService } from "../../../services/validation/OrganizerValidationService";

export class UpdateGroupUseCase {

    private readonly userService: UserService;
    private readonly groupService: GroupService;
    private readonly organizerValidationService: OrganizerValidationService;

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
        this.organizerValidationService = new OrganizerValidationService();
    }

    async execute(groupIdPk: number, userId: string, description: string, status: boolean, visibility: string, sportType: string): Promise<void> {
        const user = await this.userService.getUserByUserId(userId);
        const group = await this.groupService.getGroupById(groupIdPk);

        await this.organizerValidationService.groupManagerAccess(user, group);

        const sportTypeEnum = SportTypeHelper.fromString(sportType);
        const visibilityEnum = GroupVisibilityHelper.fromString(visibility);

        const groupEntity = await GroupEntity.fromUpdate({
            description,
            is_active: status,
            users_id: user.id!,
            sport_type: sportTypeEnum,
            visibility: visibilityEnum,
        })

        await this.groupService.updateGroup(groupEntity);
    }


}