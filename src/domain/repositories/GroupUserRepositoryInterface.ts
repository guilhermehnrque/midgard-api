import { Transaction } from "sequelize";
import { GroupsUsers } from "../models/GroupUserModel";
import { GroupUserEntity } from "../entity/GroupUserEntity";

export interface GroupUserRepositoryInterface {
    createGroupUser(groupUser: GroupUserEntity[], options: { transaction?: Transaction }): Promise<void>;
    removeGroupUser(groupId: number, userIdPk: number, options: { transaction?: Transaction }): Promise<number>;
    getGroupByUserId(userId: number): Promise<GroupsUsers[]>
    getGroupMembersByGroupId(groupId: number): Promise<GroupsUsers[]>;
    getGroupUserByGroupIdAndUserIdPk(groupId: number, userId: number): Promise<GroupsUsers | null>;
}