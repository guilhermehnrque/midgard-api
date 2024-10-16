import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { GroupVisibilityHelper } from "../../../enums/GroupVisibilitEnum";
import { SportTypeHelper } from "../../../enums/SportTypeEnum";
import { GroupService } from "../../../services/GroupService";
import { UserService } from "../../../services/UserService";

export class UpdateGroupUseCase {

    private readonly userService: UserService;
    private readonly groupService: GroupService;

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
    }

    async execute(groupIdPk: number, userId: string, description: string, status: boolean, visibility: string, sportType: string): Promise<void> {
        this.userValidations(userId)
        const user = await this.userService.getUserByUserId(userId);

        this.groupValidations(groupIdPk, user.getUserIdPk())

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

    private async userValidations(userId: string) {
        const user = await this.userService.getUserByUserId(userId);
        await this.userService.ensureUserIsOrganizer(user)
    }

    private async groupValidations(groupIdPk: number, userIdPk: number) {
        await this.groupService.ensureOrganizerIsGroupOwner(groupIdPk, userIdPk);
    }
}