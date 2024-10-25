import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { GroupVisibilityHelper } from "../../../enums/GroupVisibilitEnum";
import { SportTypeHelper } from "../../../enums/SportTypeEnum";
import { OrganizerCreatedGroupSubject } from "../../../observers/OrganizerCreatedGroupSubject";
import { GroupService } from "../../../services/GroupService";

export class CreateGroupUseCase {

    private readonly groupService: GroupService;
    private readonly organizerCreatedGroupSubject: OrganizerCreatedGroupSubject = OrganizerCreatedGroupSubject.getInstance();

    constructor() {
        this.groupService = new GroupService();
    }

    public async execute(userIdPk: number, description: string, visibility: string, sportType: string): Promise<void> {
        const sportTypeEnum = SportTypeHelper.fromString(sportType);
        const visibilityEnum = GroupVisibilityHelper.fromString(visibility);

        const groupEntity = await GroupEntity.fromUseCase({
            description,
            is_active: true,
            users_id: userIdPk,
            sport_type: sportTypeEnum,
            visibility: visibilityEnum
        })

        const groupId = await this.groupService.createGroup(groupEntity);

        await this.organizerCreatedGroupSubject.notify(userIdPk, groupId!);
    }

}
