import { GroupOrganizers } from "../models/GroupOrganizersModel";

export interface GroupOrganizersRepositoryInterface {
    includeOrganizers(groupId: number, userIdPk: number): Promise<void>;
    removeOrganizer(groupId: number, userIdPk: number): Promise<void>;
    getOrganizerByGroupId(groupId: number, userIdPk: number): Promise<GroupOrganizers | null>
}
    