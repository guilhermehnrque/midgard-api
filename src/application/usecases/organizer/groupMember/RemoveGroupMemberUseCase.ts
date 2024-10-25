import { GroupUserEntity } from "../../../../domain/entity/GroupUserEntity";
import { RemoveGroupMemberError } from "../../../erros/RemoveGroupMemberError";
import { GroupUserService } from "../../../services/GroupUserService";
import { UserService } from "../../../services/UserService";

export class RemoveGroupMemberUseCase {

    private readonly groupUsersService: GroupUserService;
    private readonly userService: UserService;

    constructor() {
        this.groupUsersService = new GroupUserService();
        this.userService = new UserService();
    }

    public async execute(groupIdPk: number, memberIdPK: number): Promise<void> {
        await this.validations(memberIdPK, groupIdPk);

        const member = await GroupUserEntity.fromData({
            groups_id: groupIdPk,
            users_id: memberIdPK,
        });

        await this.groupUsersService.removeUserFromGroup(member);
    }

    private async validations(memberIdPK: number, groupIdPk: number): Promise<void> {
        await this.groupUsersService.ensureUserIsInGroup(memberIdPK, groupIdPk);
        await this.organizerRemovingItSelf(memberIdPK, groupIdPk);
    }
    
    private async organizerRemovingItSelf(memberIdPK: number, groupIdPk: number): Promise<void> {
        const user = await this.userService.getUserByIdPk(memberIdPK);
        
        if (user.getUserIdPk() === groupIdPk) {
            throw new RemoveGroupMemberError();
        }
    }

}