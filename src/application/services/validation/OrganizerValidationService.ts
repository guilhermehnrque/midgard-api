import { ListBaseEntity } from "../../../domain/entity/ListBaseEntity";
import { UserEntity } from "../../../domain/entity/UserEntity";
import { PermissionError } from "../../erros/PermissionError";
import { GroupService } from "../GroupService";
import { UserService } from "../UserService";

export class OrganizerValidationService {

    private readonly userService: UserService;
    private readonly groupService: GroupService;

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
    }

    public async validationOrganizerIsGroupOwner(userEntity: UserEntity, groupIdPk: number): Promise<void> {
        await this.userService.ensureUserIsOrganizer(userEntity);
        await this.groupService.ensureOrganizerIsGroupOwner(groupIdPk, userEntity.getUserIdPk());
    }

    public async validationOrganizerAlreadyExists(userEntity: UserEntity, description: string): Promise<void> {
        await this.userService.ensureUserIsOrganizer(userEntity);
        await this.groupService.ensureGroupNotExists(description);
    }

    public async listAccessPermissition(listEntity: ListBaseEntity, groupIdPk: number): Promise<void> {
        if (listEntity.getGroupIdPk() != groupIdPk) {
            throw new PermissionError("Access denied to this list.");
        }
    }

}