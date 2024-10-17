import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { GroupVisibilityHelper } from "../../../enums/GroupVisibilitEnum";
import { SportTypeHelper } from "../../../enums/SportTypeEnum";
import { GroupService } from "../../../services/GroupService";
import { UserService } from "../../../services/UserService";
import { OrganizerValidationService } from "../../../services/validation/OrganizerValidationService";

export class CreateGroupUseCase {

    private readonly userService: UserService;
    private readonly groupService: GroupService;
    private readonly organizerValidationService: OrganizerValidationService;

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
        this.organizerValidationService = new OrganizerValidationService();
    }

    async execute(userId: string, description: string, visibility: string, sportType: string): Promise<void> {
        const user = await this.userService.getUserByUserId(userId);
        await this.organizerValidationService.validationOrganizerHasNoGroup(user, description);
        
        const sportTypeEnum = SportTypeHelper.fromString(sportType);
        const visibilityEnum = GroupVisibilityHelper.fromString(visibility);

        const groupEntity = await GroupEntity.fromUseCase({
            description,
            is_active: true,
            users_id: user.id!,
            sport_type: sportTypeEnum,
            visibility: visibilityEnum
        })

        await this.groupService.createGroup(groupEntity);
    }

}