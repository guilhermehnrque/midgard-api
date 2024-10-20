import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { GroupUserEntity } from "../../../../domain/entity/GroupUserEntity";
import { GroupsOutputDTO } from "../../../dto/player/group/GroupsOutputDTO";
import { GroupService } from "../../../services/GroupService";
import { GroupUserService } from "../../../services/GroupUserService";

export class GroupMembershipsUseCase {

    private readonly groupService: GroupService;
    private readonly groupUserService: GroupUserService;

    constructor() {
        this.groupService = new GroupService();
        this.groupUserService = new GroupUserService();
    }

    public async execute(userIdPk: number): Promise<GroupsOutputDTO[]> {
        const groupMemberships = await this.getGroupMembershipsByUserId(userIdPk)

        const groups = await this.getGroupDetails(groupMemberships)

        return groups.map(group => {
            return new GroupsOutputDTO(
                group.description,
                group.is_active,
                group.sport_type,
                group.visibility,
                group.id!
            );
        })
    }

    private async getGroupMembershipsByUserId(userIdPk: number): Promise<GroupUserEntity[]> {
        const groups = await this.groupUserService.getGroupUserByUserId(userIdPk);
        
        if (groups == null || groups.length == 0) {
            return [];
        }

        return groups;
    }

    private async getGroupDetails(groupMemberships: GroupUserEntity[]): Promise<GroupEntity[]> {
        return await Promise.all(groupMemberships.map(async groupMembership => {
            return await this.groupService.getGroupById(groupMembership.groups_id);
        }));
    }
}
