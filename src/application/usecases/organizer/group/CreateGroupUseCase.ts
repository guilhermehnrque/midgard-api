import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { GroupVisibilityHelper } from "../../../enums/GroupVisibilitEnum";
import { SportTypeHelper } from "../../../enums/SportTypeEnum";
import { GroupService } from "../../../services/GroupService";

export class CreateGroupUseCase {

    private readonly groupService: GroupService;

    constructor() {
        this.groupService = new GroupService();
    }

    async execute(userIdPk: number, description: string, visibility: string, sportType: string): Promise<void> {
        const sportTypeEnum = SportTypeHelper.fromString(sportType);
        const visibilityEnum = GroupVisibilityHelper.fromString(visibility);

        const groupEntity = await GroupEntity.fromUseCase({
            description,
            is_active: true,
            users_id: userIdPk,
            sport_type: sportTypeEnum,
            visibility: visibilityEnum
        })

        await this.groupService.createGroup(groupEntity);
    }

}