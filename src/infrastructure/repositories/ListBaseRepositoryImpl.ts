import { ListBaseRepositoryInterface } from "../../domain/repositories/ListBaseRepositoryInterface";
import { List } from "../../domain/models/ListBaseModel";
import { ListBaseEntity } from "../../domain/entity/ListBaseEntity";
import { CustomError } from "../../application/erros/CustomError";
import { DatabaseError } from "../../application/erros/DatabaseError";

export class ListBaseRepositoryImpl implements ListBaseRepositoryInterface {

    async createList(listEntity: ListBaseEntity): Promise<List> {
        try {
            return await List.create(listEntity.createPayload());
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[ListBaseRepositoryImpl] createList -> error creating lists -> ${customError.message}`);
        }
    }

    async updateList(listEntity: ListBaseEntity): Promise<number> {
        try {
            const [affectedCount] = await List.update(listEntity.updatePayload(), {
                where: { id: listEntity.id }
            });

            return affectedCount;
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[ListBaseRepositoryImpl] updateList -> error updating lists -> ${customError.message}`);
        }
    }

    async updateListStatus(idPk: number, status: boolean): Promise<number> {
        try {
            const [affectedCount] = await List.update({ status: status }, {
                where: { id: idPk }
            });

            return affectedCount;
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[ListBaseRepositoryImpl] updateListStatus -> error updating lists -> ${customError.message}`);
        }
    }

    public async updateConfirmedPlayers(listIdPk: number, confirmedQuantity: number): Promise<number> {
        try {
            const [affectedCount] = await List.update({ players_confirmed: confirmedQuantity }, {
                where: { id: listIdPk }
            });

            return affectedCount;
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[ListBaseRepositoryImpl] updateListStatus -> error updating lists -> ${customError.message}`);
        }
    }

    async getList(idPk: number): Promise<List | null> {
        try {
            return await List.findOne({
                where: {
                    id: idPk
                }
            })
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[ListBaseRepositoryImpl] getList error getting lists -> ${customError.message}`);
        }
    }

    async getListByGroupId(groupId: number): Promise<List[] | null> {
        try {
            return await List.findAll({
                where: {
                    groups_id: groupId
                }
            })
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[ListBaseRepositoryImpl] getListByGroupId -> error getting lists -> ${customError.message}`);
        }
    }

    async getListsByGroupsIds(groupsIds: number[]): Promise<List[]> {
        try {
            return await List.findAll({
                where: {
                    groups_id: groupsIds
                }
            });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[ListBaseRepositoryImpl] getListsByGroupsIds -> error getting lists -> ${customError.message}`);
        }
    }

    public async getListByGroupIdAndTimes(groupId: number, startTime: string, endTime: string, dayOfWeek: string, localId: number): Promise<List | null> {
        try {
            return await List.findOne({
                where: {
                    groups_id: groupId,
                    starting_time: startTime,
                    ending_time: endTime,
                    day_of_week: dayOfWeek,
                    locals_id: localId
                }
            })
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[ListBaseRepositoryImpl] getListByGroupIdAndTimes -> ${customError.message}`);
        }
    }

}
