import { UserEntity } from "../../../../domain/entity/UserEntity";
import { GroupOutputDTO } from "../../../dto/organizer/group/GroupOutputDTO";
import { GroupService } from "../../../services/GroupService";
import { UserService } from "../../../services/UserService";

export class GetGroupDetailsUseCase {

    private readonly userService: UserService;
    private readonly groupService: GroupService;

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
    }

    async execute(groupId: number, userIdPk: string): Promise<GroupOutputDTO> {
        const user = await this.userService.getUserByUserId(userIdPk);
        this.userValidations(user)

        const group = await this.groupService.getOrganizerGroupByUserIdPk(groupId, user.getUserIdPk());

        return GroupOutputDTO.fromEntity(group);
    }


    private async userValidations(userEntity: UserEntity) {
        await this.userService.ensureUserIsOrganizer(userEntity)
    }

}
