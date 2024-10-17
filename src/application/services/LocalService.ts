import { LocalEntity } from "../../domain/entity/LocalEntity";
import { Local } from "../../domain/models/LocalModel";
import { LocalRepositoryImpl } from "../../infrastructure/repositories/LocalRepositoryImpl";
import { CustomError } from "../erros/CustomError";
import { InternalError } from "../erros/InternalError";
import { LocalAlreadyExistsError } from "../erros/local/LocalAlreadyExistsError";
import { LocalNotFoundError } from "../erros/local/LocalNotFoundError";

export class LocalService {

    private readonly localRepository: LocalRepositoryImpl;

    constructor() {
        this.localRepository = new LocalRepositoryImpl();
    }

    public async createLocal(local: LocalEntity): Promise<void> {
        try {
            await this.localRepository.createLocal(local);
        } catch (error) {
            const customError = error as CustomError;
            this.logAndThrowError(new InternalError(), `[LocalService] createLocal -> ${customError.message}`);
        }
    }

    public async updateLocal(local: LocalEntity): Promise<void> { 
        try {
            await this.localRepository.updateLocal(local);
        } catch (error) {
            const customError = error as CustomError;
            this.logAndThrowError(new InternalError(), `[LocalService] updateLocal -> ${customError.message}`);
        }
    }

    public async getLocalByIdPk(idLocalPk: number): Promise<LocalEntity> {
        const local = await this.localRepository.getLocalByIdPk(idLocalPk);

        if (!local || local == null) {
            this.logAndThrowError(new LocalNotFoundError(), `[LocalService] getLocalByIdPk -> ${idLocalPk}`);
        }

        return this.createLocalEntityFromPersistence(local!); //
    }

    public async getLocalByDescription(description: string): Promise<LocalEntity> {
        const local = await this.localRepository.getLocalByDescription(description);

        if (!local || local == null) {
            this.logAndThrowError(new LocalNotFoundError(), `[LocalService] getLocalByDescription -> ${description}`);
        }

        return this.createLocalEntityFromPersistence(local!);
    }
    
    public async getLocalByDescriptionAndGroupId(description: string, groupIdPk: number): Promise<LocalEntity> {
        const local = await this.localRepository.getLocalByDescriptionAndGroupId(description, groupIdPk);

        if (!local || local == null) {
            this.logAndThrowError(new LocalNotFoundError(), `[LocalService] getLocalByDescription -> ${description}`);
        }

        return this.createLocalEntityFromPersistence(local!);
    }

    public async ensureLocalNotExists(description: string, groupIdPk: number) {
        const local = await this.localRepository.getLocalByDescriptionAndGroupId(description, groupIdPk);

        if (local || local != null) {
            this.logAndThrowError(new LocalAlreadyExistsError(), `[LocalService] ensureLocalNotExists -> ${description}`);
        }

    }
    
    public async ensureLocalExists(description: string, groupIdPk: number) {
        const local = await this.localRepository.getLocalByDescriptionAndGroupId(description, groupIdPk);

        if (!local || local == null) {
            this.logAndThrowError(new LocalNotFoundError(), `[LocalService] ensureLocalNotExists -> ${description}`);
        }

    }

    public async getLocalsByGroupId(groupId: number): Promise<LocalEntity[]> {
        const locals = await this.localRepository.getLocalsByGroupId(groupId);

        if (!locals || locals === null) {
            return [];
        }

        return await Promise.all(locals.map(this.createLocalEntityFromPersistence))
    }

    private async createLocalEntityFromPersistence(local: Local): Promise<LocalEntity> {
        return await LocalEntity.fromPersistence({
            id: local.id,
            description: local.description,
            country: local.country,
            state: local.state,
            city: local.city,
            street: local.street,
            zip_code: local.zip_code,
            number: local.number,
            groups_id: local.groups_id,
            created_at: local.created_at,
            updated_at: local.updated_at
        });
    }

    private logAndThrowError(error: CustomError, context: string): void {
        console.error(`${context}: ${error.message}`);
        throw error;
    }

}