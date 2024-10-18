import { LocalEntity } from "../entity/LocalEntity";
import { Local } from "../models/LocalModel";

export interface LocalRepositoryInterface {
    createLocal(localEntity: LocalEntity, options: any): Promise<Local>;
    updateLocal(localEntity: LocalEntity): Promise<number>;
    getLocalByIdPk(id: number): Promise<Local | null>;
    getLocalByDescription(description: string): Promise<Local | null | undefined>;
    getLocalByDescriptionAndGroupId(description: string, groupIdPk: number): Promise<Local | null>
    getLocalsByGroupId(groupId: number): Promise<Local[] | null | undefined>
}
