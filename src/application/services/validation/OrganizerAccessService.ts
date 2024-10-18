import { GroupEntity } from "../../../domain/entity/GroupEntity";
import { UserEntity } from "../../../domain/entity/UserEntity";
import { UserTypes } from "../../enums/UserTypes";
import { PermissionError } from "../../erros/PermissionError";
import { GroupService } from "../GroupService";
import { ListBaseService } from "../ListBaseService";
import { UserService } from "../UserService";

export class OrganizerAccessService {

    private readonly userService: UserService;
    private readonly groupService: GroupService;
    private readonly listBaseService: ListBaseService;

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
        this.listBaseService = new ListBaseService
    }

    public async validateAccess({ userId, groupId, listId }: { userId: string, groupId?: number, listId?: number }): Promise<number> {
        const user = await this.userService.getUserByUserId(userId);

        if (groupId) {
            const group = await this.groupService.getGroupById(groupId);
            await this.groupManagerAccess(user, group);
        } else if (listId) {
            const list = await this.listBaseService.getList(listId);
            const group = await this.groupService.getGroupById(list.getGroupIdPk());
            await this.groupManagerAccess(user, group);
        } else {
            await this.managerAccess(user);
        }

        return user.getUserIdPk();
    }

    public async validateListAccess({ userId, listId }: { userId: string, listId: number }): Promise<void> {
        const user = await this.userService.getUserByUserId(userId);

        if (listId) {
            const list = await this.listBaseService.getList(listId);
            const group = await this.groupService.getGroupById(list.getGroupIdPk());
            await this.groupManagerAccess(user, group);
        }

        await this.managerAccess(user);
    }


    private async groupManagerAccess(userEntity: UserEntity, groupEntity: GroupEntity): Promise<void> {
        await this.ensureUserIsOrganizer(userEntity);
        await this.ensureOrganizerIsGroupOwner(groupEntity);
    }

    private async managerAccess(userEntity: UserEntity): Promise<void> {
        await this.ensureUserIsOrganizer(userEntity);
    }

    private async ensureUserIsOrganizer(user: UserEntity): Promise<void> {
        if (!user || user.type != UserTypes.ORGANIZER.toString()) {
            console.error(`[OrganizerValidationService] ensureUserIsOrganizer -> Access denied`);
            throw new PermissionError("Access denied.");
        }
    }

    private async ensureOrganizerIsGroupOwner(groupEntity: GroupEntity): Promise<void> {
        if (!groupEntity || groupEntity == null) {
            console.error(`[OrganizerValidationService] ensureOrganizerIsGroupOwner -> Access denied`);
            throw new PermissionError("Access denied.");
        }
    }

}