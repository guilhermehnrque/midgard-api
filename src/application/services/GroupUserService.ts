import { GroupUserEntity } from "../../domain/entity/GroupUserEntity";
import { GroupsUsers } from "../../domain/models/GroupUserModel";
import { GroupUserRepositoryImpl } from "../../infrastructure/repositories/GroupUserRepositoryImpl";
import { CustomError } from "../erros/CustomError";
import { RegisterToGroupError } from "../erros/groupUser/RegisterToGroupError";
import { GroupNotFoundError } from "../erros/groups/GroupNotFoundError";
import sequelize from "../../infrastructure/database/index";
import { UserAlreadyInGroupError } from "../erros/groupUser/UserAlreadyInGroupError";
import { UsertNotGroupMember } from "../erros/groupUser/UsertNotGroupMember";


export class GroupUserService {

    private readonly groupUserRepository: GroupUserRepositoryImpl;

    constructor() {
        this.groupUserRepository = new GroupUserRepositoryImpl();
    }

    public async registerUserToGroup(userGroupEntity: GroupUserEntity[]): Promise<void> {
        const transaction = await sequelize.transaction();

        try {
            await this.groupUserRepository.createGroupUser(userGroupEntity, { transaction });
            transaction.commit();
        } catch (error) {
            transaction.rollback();
            const customError = error as CustomError;
            this.logAndThrowError(new RegisterToGroupError(), `[GroupUserService] registerUserToGroup -> ${customError.message}`);
        }

    }

    public async removeUserFromGroup(userGroupEntity: GroupUserEntity): Promise<void> {
        const transaction = await sequelize.transaction();

        try {
            await this.groupUserRepository.removeGroupUser(userGroupEntity.groups_id, userGroupEntity.users_id, { transaction })
            transaction.commit();
        } catch (error) {
            transaction.rollback();
            const customError = error as CustomError;
            this.logAndThrowError(new RegisterToGroupError(), `[GroupUserService] removeUserFromGroup -> ${customError.message}`);
        }

    }

    public async getGroupUserByUserId(userIdPk: number): Promise<GroupUserEntity[]> {
        const groupUsers = await this.groupUserRepository.getGroupByUserId(userIdPk);

        if (groupUsers == null || groupUsers.length == 0) {
            return [];
        }

        return Promise.all(groupUsers.map(this.createGroupUserEntityFromPersitence));
    }

    public async getGroupMembersByGroupId(groupIdPk: number): Promise<GroupUserEntity[]> {
        const groupMembers = await this.groupUserRepository.getGroupMembersByGroupId(groupIdPk);

        if (groupMembers == null || groupMembers.length == 0) {
            return [];
        }

        return Promise.all(groupMembers.map(this.createGroupUserEntityFromPersitence));
    }

    public async getGroupUsersByGroupIdAndUserIdPk(userId: number, groupId: number): Promise<GroupUserEntity> {
        const groupUser = await this.groupUserRepository.getGroupUserByGroupIdAndUserIdPk(groupId, userId);

        if (groupUser == null) {
            this.logAndThrowError(new GroupNotFoundError(), `[GroupUserService] getGroupUsersByGroupIdAndUserIdPk -> userId: ${userId} groupId: ${groupId}`)
        }

        return this.createGroupUserEntityFromPersitence(groupUser!);
    }

    public async ensureUserIsNotInGroup(userId: number, groupId: number): Promise<void> {
        const groupUser = await this.groupUserRepository.getGroupUserByGroupIdAndUserIdPk(groupId, userId);

        if (groupUser !== null) {  
            this.logAndThrowError(new UserAlreadyInGroupError(),
                `[GroupUserService] ensureUserIsNotInGroup -> userId: ${userId} groupId: ${groupId}: User already in group`);
        }
    }

    public async ensureUserIsInGroup(userId: number, groupId: number): Promise<void> {
        const groupUser = await this.groupUserRepository.getGroupUserByGroupIdAndUserIdPk(groupId, userId);

        if (groupUser === null) {  
            this.logAndThrowError(new UsertNotGroupMember(),
                `[GroupUserService] ensureUserIsInGroup -> userId: ${userId} groupId: ${groupId}: User not in group`);
        }
    }
    
    private async createGroupUserEntityFromPersitence(groupUser: GroupsUsers): Promise<GroupUserEntity> {
        return await GroupUserEntity.fromData({
            id: groupUser.id,
            groups_id: groupUser.groups_id,
            users_id: groupUser.users_id
        });
    }

    private logAndThrowError(error: CustomError, context: string): void {
        console.error(`${context}: ${error.message}`);
        throw error;
    }

}