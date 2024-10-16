import { GroupEntity } from "../entity/GroupEntity";
import { Group } from "../models/GroupModel";

export interface GroupRepositoryInterface {
    createGroup(groupEntity: GroupEntity): Promise<Group>;
    updateGroup(groupEntity: GroupEntity): Promise<number>;
    getOrganizerGroups(userIdPk: number): Promise<Group[]>;
    getOrganizerGroupByUserIdPk(userIdPk: number, groupId: number): Promise<Group | null>
    getGroupById(groupId: number): Promise<Group | null>;
    getGroupByDescription(groupDescription: string): Promise<Group | null>;
}