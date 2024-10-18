import { ListBaseEntity } from "../../domain/entity/ListBaseEntity";
import { List } from "../../domain/models/ListBaseModel";
import { ListBaseRepositoryImpl } from "../../infrastructure/repositories/ListBaseRepositoryImpl";
import { CustomError } from "../erros/CustomError";
import { InternalError } from "../erros/InternalError";
import { ListNotFoundError } from "../erros/list/ListBaseErrors";

export class ListBaseService {

    private readonly listBaseRepository: ListBaseRepositoryImpl;

    constructor() {
        this.listBaseRepository = new ListBaseRepositoryImpl();
    }

    public async createList(list: ListBaseEntity): Promise<void> {
        try {
            await this.listBaseRepository.createList(list);
        } catch (error) {
            const customError = error as CustomError;
            this.logAndThrowError(new InternalError(), `[ListBaseService] createList -> ${customError.message}`);
        }
    }

    public async updateList(list: ListBaseEntity): Promise<number> {
        try {
            return await this.listBaseRepository.updateList(list);
        } catch (error) {
            const customError = error as CustomError;
            this.logAndThrowError(new InternalError(), `[ListBaseService] updateList -> ${customError.message}`);
            return 0;
        }
    }

    public async getList(listIdPk: number): Promise<ListBaseEntity> {
        const list = await this.listBaseRepository.getList(listIdPk);

        if (!list || list == null) {
            this.logAndThrowError(new ListNotFoundError(), `[ListBaseService] getList -> ${listIdPk}`);
        }

        return this.createEntityFromPersistence(list!);
    }

    public async getListsByGroupId(groupIdPk: number): Promise<ListBaseEntity[]> {
        const list = await this.listBaseRepository.getListByGroupId(groupIdPk);

        if (!list || list == null) {
            return [];
        }

        return Promise.all(list.map(this.createEntityFromPersistence));
    }

    public async getListByGroupIdAndTimes(groupId: number, startTime: string, endTime: string, dayOfWeek: string): Promise<ListBaseEntity | null> {
        const list = await this.listBaseRepository.getListByGroupIdAndTimes(groupId, startTime, endTime, dayOfWeek);

        if (!list || list == null) {
            return null;
        }

        return this.createEntityFromPersistence(list);
    }

    private async createEntityFromPersistence(listBase: List): Promise<ListBaseEntity> {
        return await ListBaseEntity.fromPersistence({
            id: listBase.id,
            status: listBase.status,
            player_limit: listBase.player_limit,
            starting_time: listBase.starting_time,
            ending_time: listBase.ending_time,
            day_of_week: listBase.day_of_week,
            groups_id: listBase.groups_id,
            created_at: listBase.created_at,
            updated_at: listBase.updated_at,
        })
    }

    private logAndThrowError(error: CustomError, context: string): void {
        console.error(`${context}: ${error.message}`);
        throw error;
    }

}