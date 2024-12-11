import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { GroupVisibilityHelper } from "../../../enums/GroupVisibilitEnum";
import { SportTypeHelper } from "../../../enums/SportTypeEnum";
import { GroupNotFoundError } from "../../../erros/groups/GroupNotFoundError";
import { GroupService } from "../../../services/GroupService";

export class UpdateGroupUseCase {

    private readonly groupService: GroupService;

    constructor() {
        this.groupService = new GroupService();
    }

    public async execute(groupIdPk: number, description: string, status: boolean, visibility: string, sportType: string, userIdPk: number): Promise<void> {
        const sportTypeEnum = SportTypeHelper.fromString(sportType);
        const visibilityEnum = GroupVisibilityHelper.fromString(visibility);

        await this.checkGroup(userIdPk, description);

        const groupEntity = await GroupEntity.fromUpdate({
            id: groupIdPk,
            description,
            is_active: status,
            users_id: userIdPk,
            sport_type: sportTypeEnum,
            visibility: visibilityEnum,
        })

        await this.groupService.updateGroup(groupEntity);
    }

    private async checkGroup(userIdPk: number, description: string) {
        const group = await this.groupService.getOrganizerGroupByDescription(userIdPk, description);

        if (group == null) {
            throw new GroupNotFoundError();
        }
    }


}