import { GroupOrganizers } from "../models/GroupOrganizersModel";

export interface GroupOrganizersRepositoryInterface {
    includeOrganizers(groupId: number, userIdPk: number): Promise<void>;
    removeOrganizer(groupId: number, userIdPk: number): Promise<void>;
    checkAlreadyOrganizer(groupId: number, userIdPk: number): Promise<GroupOrganizers | null>
}
    