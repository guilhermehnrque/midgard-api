import { GroupEntity } from "../entity/GroupEntity";
import { Group } from "../models/GroupModel";

export interface GroupRepositoryInterface {
    createGroup(groupEntity: GroupEntity): Promise<number>;
    updateGroup(groupEntity: GroupEntity): Promise<number>;
    getOrganizerGroups(userIdPk: number): Promise<Group[]>;
    getGroupById(groupId: number): Promise<Group | null>;
    getGroupByDescription(groupDescription: string): Promise<Group | null>;
    getGroupsByStatus(status: boolean): Promise<Group[]>;
    getGroupByDescriptionAndUserId(userIdPk: number, description: string): Promise<Group | null>;
}