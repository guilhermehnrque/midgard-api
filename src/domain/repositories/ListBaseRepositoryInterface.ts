import { ListBaseEntity } from "../entity/ListBaseEntity";
import { List } from "../models/ListBaseModel";

export interface ListBaseRepositoryInterface {
    createList(listEntity: ListBaseEntity): Promise<List>;
    updateList(listEntity: ListBaseEntity): Promise<number>;
    updateListStatus(idPk: number, status: boolean): Promise<number>;
    getList(idPk: number): Promise<List | null>;
    getListByGroupId(groupId: number): Promise<List[] | null> 
    getListsByGroupsIds(groupsIds: number[]): Promise<List[]>;
    getListByGroupIdAndTimes(groupId: number, startTime: string, endTime: string, dayOfWeek: string): Promise<List | null>
}
