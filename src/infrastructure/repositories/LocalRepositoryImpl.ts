import { CustomError } from "../../application/erros/CustomError";
import { DatabaseError } from "../../application/erros/DatabaseError";
import { LocalEntity } from "../../domain/entity/LocalEntity";
import { Local } from "../../domain/models/LocalModel";
import { LocalRepositoryInterface } from "../../domain/repositories/LocalRepositoryInterface";

export class LocalRepositoryImpl implements LocalRepositoryInterface {
    
    async createLocal(localEntity: LocalEntity): Promise<Local> {
        try {
            return await Local.create(localEntity.createPayload());
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[LocalRepositoryImpl] createLocal -> Error creating group: ${customError.message}`);
        }
    }

    async updateLocal(localEntity: LocalEntity): Promise<number> {
        try {
            const [affectedCount] = await Local.update(localEntity.updatePayload(),
                {
                    where: {
                        id: localEntity.id
                    },
                });

            return affectedCount;
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[LocalRepositoryImpl] updateLocal -> Error updating local: ${customError.message}`);
        }
    }

    async getLocalByIdPk(id: number): Promise<Local | null> {
        try {
            return await Local.findByPk(id);
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[LocalRepositoryImpl] getLocalByIdPk -> Error getting local by id: ${customError.message}`);
        }
    }

    async getLocalByDescription(description: string): Promise<Local | null | undefined> {
        try {
            return await Local.findOne({ where: { description } });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[LocalRepositoryImpl] getLocalByDescription -> Error getting local by description: ${customError.message}`);
        }
    }

    async getLocalsByGroupId(groupId: number): Promise<Local[] | null | undefined> {
        try {
            return await Local.findAll({ where: { groups_id: groupId } });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[LocalRepositoryImpl] getLocalsByGroupId -> Error getting locals by group id: ${customError.message}`);
        }
    }

}