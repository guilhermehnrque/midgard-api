import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { GroupVisibilityHelper } from "../../../enums/GroupVisibilitEnum";
import { SportTypeHelper } from "../../../enums/SportTypeEnum";
import { GroupService } from "../../../services/GroupService";

export class UpdateGroupUseCase {

    private readonly groupService: GroupService;

    constructor() {
        this.groupService = new GroupService();
    }

    async execute(groupIdPk: number, description: string, status: boolean, visibility: string, sportType: string): Promise<void> {
        const sportTypeEnum = SportTypeHelper.fromString(sportType);
        const visibilityEnum = GroupVisibilityHelper.fromString(visibility);

        const groupEntity = await GroupEntity.fromUpdate({
            id: groupIdPk,
            description,
            is_active: status,
            sport_type: sportTypeEnum,
            visibility: visibilityEnum,
        })

        await this.groupService.updateGroup(groupEntity);
    }


}