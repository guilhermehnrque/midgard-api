import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { UserEntity } from "../../../../domain/entity/UserEntity";
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
        const user = await this.userService.getUserByUserId(userId);
        
        this.userValidations(user)
        this.groupValidations(groupIdPk, user.getUserIdPk());

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

    private async userValidations(userEntity: UserEntity) {
        await this.userService.ensureUserIsOrganizer(userEntity)
    }

    private async groupValidations(groupIdPk: number, userIdPk: number) {
        await this.groupService.ensureOrganizerIsGroupOwner(groupIdPk, userIdPk);
    }
}