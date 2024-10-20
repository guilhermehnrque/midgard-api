import { GroupEntity } from "../../domain/entity/GroupEntity";
import { Group } from "../../domain/models/GroupModel";
import { GroupRepositoryImpl } from "../../infrastructure/repositories/GroupRepositoryImpl";
import { GroupVisibilityHelper } from "../enums/GroupVisibilitEnum";
import { SportTypeHelper } from "../enums/SportTypeEnum";
import { CustomError } from "../erros/CustomError";
import { GroupAlreadyExists } from "../erros/groups/GroupAlreadyRegistered";
import { GroupNotFoundError } from "../erros/groups/GroupNotFoundError";
import { InternalError } from "../erros/InternalError";

export class GroupService {

    private readonly groupRepository: GroupRepositoryImpl;

    constructor() {
        this.groupRepository = new GroupRepositoryImpl();
    }

    public async createGroup(group: GroupEntity): Promise<void> {
        await this.ensureGroupNotExists(group.description);

        try {
            await this.groupRepository.createGroup(group);
        } catch (error) {
            const customError = error as CustomError;
            this.logAndThrowError(new InternalError(), `[GroupService] createGroup -> ${customError.message}`);
        }
    }

    public async updateGroup(group: GroupEntity): Promise<number> {
        await this.ensureGroupExists(group.id!)
        try {
            return await this.groupRepository.updateGroup(group);
        } catch (error) {
            const customError = error as CustomError;
            this.logAndThrowError(new InternalError(), `[GroupService] updateGroupByI -> ${customError.message}`);
            return 0;
        }
    }

    public async getOrganizerGroupsByUserIdPk(userIdPk: number): Promise<GroupEntity[]> {
        const group = await this.groupRepository.getOrganizerGroups(userIdPk);

        if (!group || group == null) {
            return [];
        }

        return Promise.all(group.map(this.createEntityFromPersistante));
    }

    public async getGroupByDescription(description: string): Promise<GroupEntity> {
        const group = await this.groupRepository.getGroupByDescription(description);

        if (!group || group == null) {
            this.logAndThrowError(new GroupNotFoundError(), `[GroupService] getGroupByDescription -> description: ${description}`)
        }

        return this.createEntityFromPersistante(group!);
    }

    public async getGroupById(groupId: number): Promise<GroupEntity> {
        const group = await this.groupRepository.getGroupById(groupId);

        if (!group || group == null) {
            this.logAndThrowError(new GroupNotFoundError(), `[GroupService] getGroupById -> groupId: ${groupId}`);
        }

        return await this.createEntityFromPersistante(group!);
    }

    public async getGroupsByStatus(status: boolean): Promise<GroupEntity[]> {
        const groups = await this.groupRepository.getGroupsByStatus(status);

        if (!groups || groups == null) {
            return [];
        }

        return Promise.all(groups.map(this.createEntityFromPersistante));
    }

    public async ensureGroupNotExists(description: string): Promise<void> {
        const group = await this.groupRepository.getGroupByDescription(description)

        if (group || group != null) {
            this.logAndThrowError(new GroupAlreadyExists(), `[GroupService] ensureGroupNotExists -> ${description}`);
        }
    }

    public async ensureGroupExists(groupIdPk: number): Promise<void> {
        const group = await this.groupRepository.getGroupById(groupIdPk)

        if (!group || group == null) {
            this.logAndThrowError(new GroupNotFoundError(), `[GroupService] ensureGroupExists -> ${groupIdPk}`);
        }
    }

    private async createEntityFromPersistante(group: Group): Promise<GroupEntity> {
        const sportTypeEnum = SportTypeHelper.fromString(group.sport_type);
        const visibilityEnum = GroupVisibilityHelper.fromString(group.visibility);

        return GroupEntity.fromPersistence({
            id: group.id,
            description: group.description,
            is_active: group.is_active,
            users_id: group.users_id,
            sport_type: sportTypeEnum,
            visibility: visibilityEnum,
            created_at: group.created_at,
            updated_at: group.updated_at,
        });
    }

    private logAndThrowError(error: CustomError, context: string): void {
        console.error(`${context}: ${error.message}`);
        throw error;
    }

}