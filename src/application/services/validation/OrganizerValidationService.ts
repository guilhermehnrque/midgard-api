import { GroupEntity } from "../../../domain/entity/GroupEntity";
import { ListBaseEntity } from "../../../domain/entity/ListBaseEntity";
import { UserEntity } from "../../../domain/entity/UserEntity";
import { UserTypes } from "../../enums/UserTypes";
import { PermissionError } from "../../erros/PermissionError";

export class OrganizerValidationService {

    public async groupManagerAccess(userEntity: UserEntity, groupEntity: GroupEntity): Promise<void> {
        await this.ensureUserIsOrganizer(userEntity);
        await this.ensureOrganizerIsGroupOwner(groupEntity);
    }

    public async managerAccess(userEntity: UserEntity): Promise<void>{
        await this.ensureUserIsOrganizer(userEntity);
    }

    public async listAccessPermissition(listEntity: ListBaseEntity, groupIdPk: number): Promise<void> {
        if (listEntity.getGroupIdPk() != groupIdPk) {
            throw new PermissionError("Access denied to this list.");
        }
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