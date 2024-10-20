import { Transaction } from "sequelize";
import { GroupsUsers } from "../../domain/models/GroupUserModel";
import { CustomError } from "../../application/erros/CustomError";
import { DatabaseError } from "../../application/erros/DatabaseError";
import { GroupUserRepositoryInterface } from "../../domain/repositories/GroupUserRepositoryInterface";
import { GroupUserEntity } from "../../domain/entity/GroupUserEntity";

export class GroupUserRepositoryImpl implements GroupUserRepositoryInterface {

    public async createGroupUser(groupUser: GroupUserEntity[], options: { transaction?: Transaction }): Promise<void> {
        try {
            for (const innerGroupUser of groupUser) {
                await GroupsUsers.bulkCreate([innerGroupUser.registerPayload()], { transaction: options.transaction });
            }
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupUserRepositoryImpl] createGroupUser -> ${customError.message}`);
        }
    }

    public async removeGroupUser(groupId: number, userIdPk: number, options: { transaction?: Transaction }): Promise<number> {
        try {
            return await GroupsUsers.destroy({
                where: {
                    groups_id: groupId,
                    users_id: userIdPk
                },
                transaction: options.transaction
            });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupUserRepositoryImpl] removeGroupUser Error removing group user: ${customError.message}`);
        }
    }

    public async getGroupByUserId(userId: number): Promise<GroupsUsers[]> {
        try {
            return await GroupsUsers.findAll({
                where: {
                    users_id: userId
                }
            });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupUserRepositoryImpl] getGroupByUserId -> ${customError.message}`);
        }
    }

    public async getGroupMembersByGroupId(groupId: number): Promise<GroupsUsers[]> {
        try {
            return await GroupsUsers.findAll({
                where: {
                    groups_id: groupId,
                },
            });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupUserRepositoryImpl] getGroupMembersByGroupId -> ${customError.message}`);
        }
    }

    public async getGroupUserByGroupIdAndUserIdPk(groupId: number, userId: number): Promise<GroupsUsers | null> {
        try {
            return await GroupsUsers.findOne({
                where: {
                    users_id: userId,
                    groups_id: groupId
                }
            });

        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupUserRepositoryImpl] checkIfUserIsInGroup -> ${customError.message}`);
        }
    }

}

