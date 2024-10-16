import { GroupEntity } from "../../domain/entity/GroupEntity";
import { GroupRepositoryInterface } from "../../domain/repositories/GroupRepositoryInterface";
import { Group } from "../../domain/models/GroupModel";
import { DatabaseError } from "../../application/erros/DatabaseError";
import { CustomError } from "../../application/erros/CustomError";

export class GroupRepositoryImpl implements GroupRepositoryInterface {

    async createGroup(groupEntity: GroupEntity): Promise<Group> {
        try {
            return await Group.create(groupEntity.toCreatePayload());
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] createGroup -> Error creating group: ${customError.message}`);
        }
    }

    async updateGroupById(groupEntity: GroupEntity): Promise<number> {
        try {
            const [affectedCount] = await Group.update(groupEntity.toUpdatePayload(), {
                where: {
                    id: groupEntity.id!,
                    users_id: groupEntity.users_id
                }
            });
            return affectedCount;
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] updateGroupById -> Error updating group by id: ${customError.message}`);
        }
    }

    async getOrganizerGroups(userIdPk: number): Promise<Group[]> {
        try {
            return await Group.findAll({
                where: { users_id: userIdPk },
            });
        }
        catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] getOrganizerGroups -> Error getting organizer groups: ${customError.message}`);
        }
    }

    async getGroupByDescription(groupDescription: string): Promise<Group | null> {
        try {
            return await Group.findOne({ where: { description: groupDescription } });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] getGroupByDescription -> Error getting group by description: ${customError.message}`);
        }
    }

    async getGroupById(groupId: number): Promise<Group | null> {
        try {
            return await Group.findByPk(groupId);
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] getGroupById -> Error getting group by id: ${customError.message}`);
        }
    }

}