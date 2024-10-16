import { GroupEntity } from "../../domain/entity/GroupEntity";
import { Group } from "../../domain/models/GroupModel";
import { GroupRepositoryImpl } from "../../infrastructure/repositories/GroupRepositoryImpl";
import { CustomError } from "../erros/CustomError";
import { GroupNotFoundError } from "../erros/groups/GroupNotFoundError";
import { InternalError } from "../erros/InternalError";

export class GroupService {

    private readonly groupRepository: GroupRepositoryImpl;

    constructor() {
        this.groupRepository = new GroupRepositoryImpl();
    }

    async createGroup(group: GroupEntity): Promise<void> {
        try {
            await this.groupRepository.createGroup(group);
        } catch (error) {
            const customError = error as CustomError;
            this.logAndThrowError(new InternalError(), `[GroupService] createGroup -> ${customError.message}`);
        }
    }

    async updateGroupById(group: GroupEntity): Promise<number> {
        try {
            return await this.groupRepository.updateGroupById(group);
        } catch (error) {
            const customError = error as CustomError;
            this.logAndThrowError(new InternalError(), `[GroupService] updateGroupByI -> ${customError.message}`);
            return 0;
        }
    }

    async getOrganizerGroupsByUserIdPk(userIdPk: number): Promise<GroupEntity[]> {
        const group = await this.groupRepository.getOrganizerGroups(userIdPk);

        if (!group) {
            return [];
        }

        return Promise.all(group.map(this.createEntityFromPersistante));
    }

    async getOrganizerGroupByUserIdPk(userIdPk: number, groupIdPk: number): Promise<GroupEntity> {
        const group = await this.groupRepository.getOrganizerGroupByUserIdPk(userIdPk, groupIdPk);

        if (!group || group == null) {
            this.logAndThrowError(new GroupNotFoundError(), `[GroupService] getOrganizerGroupByUserIdPk -> userIdPk: ${userIdPk} -> groupIdPk: ${groupIdPk}`)
        }

        return this.createEntityFromPersistante(group!);
    }

    async getGroupByDescription(description: string): Promise<GroupEntity> {
        const group = await this.groupRepository.getGroupByDescription(description);

        if (!group || group == null) {
            this.logAndThrowError(new GroupNotFoundError(), `[GroupService] getGroupByDescription -> description: ${description}`)
        }

        return this.createEntityFromPersistante(group!);
    }

    async getGroupById(groupId: number): Promise<GroupEntity> {
        const group = await this.groupRepository.getGroupById(groupId);

        if (!group || group == null) {
            this.logAndThrowError(new GroupNotFoundError(), `[GroupService] getGroupById -> groupId: ${groupId}`);
        }

        return await this.createEntityFromPersistante(group!);
    }

    async createEntityFromPersistante(group: Group): Promise<GroupEntity> {
        return new GroupEntity({
            id: group.id,
            description: group.description,
            is_active: group.is_active,
            users_id: group.users_id,
            visibility: group.visibility,
            created_at: group.created_at,
            updated_at: group.updated_at,
        });
    }

    private logAndThrowError(error: CustomError, context: string): void {
        console.error(`${context}: ${error.message}`);
        throw error;
    }

}