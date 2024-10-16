import { ListBaseEntity } from "../../domain/entity/ListBaseEntity";
import { List } from "../../domain/models/ListBaseModel";
import { ListBaseRepositoryImpl } from "../../infrastructure/repositories/ListBaseRepositoryImpl";
import { CustomError } from "../erros/CustomError";
import { ListNotFoundError } from "../erros/list/ListBaseErrors";

export class ListBaseService {

    private readonly listBaseRepository: ListBaseRepositoryImpl;

    constructor() {
        this.listBaseRepository = new ListBaseRepositoryImpl();
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