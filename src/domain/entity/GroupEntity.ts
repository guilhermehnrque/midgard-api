import { GroupAttributes } from "../interfaces/attributes/GroupAttributes";

export class GroupEntity implements GroupAttributes {

    public id?: number;
    public description: string;
    public is_active: boolean;
    public users_id: number;
    public sport_type: string;
    public visibility: string;
    public created_at: Date;
    public updated_at: Date;

    constructor(payload: Partial<GroupEntity>) {
        this.description = payload.description!;
        this.is_active = payload.is_active!;
        this.users_id = payload.users_id!;
        this.visibility = payload.visibility!;
        this.sport_type = payload.sport_type!;
        this.created_at = payload.created_at!;
        this.updated_at = payload.updated_at!;
        this.id = payload.id;
    }

    static async fromUseCase(payload: Partial<GroupEntity>): Promise<GroupEntity> {
        return new GroupEntity({
            ...payload,
            created_at: new Date(),
            updated_at: new Date()
        });
    }

    static async fromUpdate(payload: Partial<GroupEntity>): Promise<GroupEntity> {
        return new GroupEntity({
            ...payload,
            updated_at: new Date(),
        });
    }

    static async fromPersistence(payload: Partial<GroupEntity>): Promise<GroupEntity> {
        return new GroupEntity({
            ...payload
        });
    }

    public setStatus(status: boolean) {
        this.is_active = status;
    }

    public setId(id: number) {
        this.id = id;
    }

    public setGroupOwner(user_id: number) {
        this.users_id = user_id;
    }

    public setGroupStatus(status: boolean) {
        this.is_active = status;
    }

    toCreatePayload() {
        return {
            description: this.description,
            is_active: this.is_active,
            users_id: this.users_id,
            sport_type: this.sport_type,
            visibility: this.visibility,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }

    toUpdatePayload() {
        return {
            id: this.id!,
            description: this.description,
            is_active: this.is_active,
            sport_type: this.sport_type,
            users_id: this.users_id,
            visibility: this.visibility,
            updated_at: this.updated_at
        };
    }

}
