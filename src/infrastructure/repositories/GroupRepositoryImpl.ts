import { GroupEntity } from "../../domain/entity/GroupEntity";
import { GroupRepositoryInterface } from "../../domain/repositories/GroupRepositoryInterface";
import { Group } from "../../domain/models/GroupModel";
import { DatabaseError } from "../../application/erros/DatabaseError";
import { CustomError } from "../../application/erros/CustomError";

export class GroupRepositoryImpl implements GroupRepositoryInterface {

    public async createGroup(groupEntity: GroupEntity): Promise<number> {
        try {
            const group =  await Group.create(groupEntity.toCreatePayload());
            return group.id;
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] createGroup -> ${customError.message}`);
        }
    }

    public async updateGroup(groupEntity: GroupEntity): Promise<number> {
        try {
            const [affectedCount] = await Group.update(groupEntity.toUpdatePayload(), {
                where: {
                    users_id: groupEntity.users_id,
                    id: groupEntity.id
                }
            });
            return affectedCount;
        } catch (error) {
            console.error(error);
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] updateGroup -> ${customError.message}`);
        }
    }

    public async getOrganizerGroups(userIdPk: number): Promise<Group[]> {
        try {
            return await Group.findAll({
                where: { users_id: userIdPk },
            });
        }
        catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] getOrganizerGroups -> ${customError.message}`);
        }
    }

    public async getGroupByDescription(groupDescription: string): Promise<Group | null> {
        try {
            return await Group.findOne({ where: { description: groupDescription } });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] getGroupByDescription -> ${customError.message}`);
        }
    }

    public async getGroupById(groupId: number): Promise<Group | null> {
        try {
            return await Group.findByPk(groupId);
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] getGroupById -> ${customError.message}`);
        }
    }

    public async getGroupsByStatus(status: boolean): Promise<Group[]> {
        try {
            return await Group.findAll({ where: { is_active: status } });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] getGroupsByStatus -> ${customError.message}`);
        }
    }

    public async getGroupByDescriptionAndUserId(userIdPk: number, description: string): Promise<Group | null> {
        try {
            return await Group.findOne({ where: { users_id: userIdPk, description: description } });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] getGroupByDescriptionAndUserId -> ${customError.message}`);
        }
    }

    public async getOrganizerGroupById(userIdPk: number, groupId: number): Promise<Group | null> {
        try {
            return await Group.findOne({ where: { users_id: userIdPk, id: groupId } });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] getOrganizerGroupById -> ${customError.message}`);
        }
    }

}