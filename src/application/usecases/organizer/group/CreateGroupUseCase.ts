import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { GroupVisibilityHelper } from "../../../enums/GroupVisibilitEnum";
import { SportTypeHelper } from "../../../enums/SportTypeEnum";
import { GroupService } from "../../../services/GroupService";
import { UserService } from "../../../services/UserService";

export class CreateGroupUseCase {

    private readonly userService: UserService;
    private readonly groupService: GroupService;

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
    }

    async execute(userId: string, description: string, visibility: string, sportType: string): Promise<void> {
        this.userValidations(userId)
        const user = await this.userService.getUserByUserId(userId);

        this.groupValidations(description)

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

    private async userValidations(userId: string) {
        const user = await this.userService.getUserByUserId(userId);
        await this.userService.ensureUserIsOrganizer(user)
    }

    private async groupValidations(description: string) {
        await this.groupService.ensureGroupNotExists(description);
    }
}