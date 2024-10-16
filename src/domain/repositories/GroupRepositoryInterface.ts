import { GroupEntity } from "../entity/GroupEntity";
import { Group } from "../models/GroupModel";

export interface GroupRepositoryInterface {
    createGroup(groupEntity: GroupEntity): Promise<Group>;
    updateGroupById(groupEntity: GroupEntity): Promise<number>;
    getOrganizerGroups(userIdPk: number): Promise<Group[]>;
    getGroupById(groupId: number): Promise<Group | null>;
    getGroupByDescription(groupDescription: string): Promise<Group | null>;
}