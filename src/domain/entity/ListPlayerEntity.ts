import { PlayerStatusVO } from "../../application/valueobjects/PlayerStatusVO";
import { ListPlayerAttributes } from "../interfaces/attributes/ListPlayerAttributes";

export class ListPlayerEntity implements ListPlayerAttributes {

    public id?: number;
    public list_base_id: number;
    public player_status: string;
    public users_id?: number | null;
    public guest_id?: number | null;
    public created_at: Date;
    public updated_at: Date;

    constructor(payload: Partial<ListPlayerEntity>) {
        this.list_base_id = payload.list_base_id!;
        this.player_status = this.getUserStatus(payload.player_status!);
        this.users_id = payload.users_id!;
        this.guest_id = payload.guest_id!;
        this.created_at = payload.created_at!;
        this.updated_at = payload.updated_at!;
        this.id = payload.id;
    }

    static async fromCreateUseCase(payload: Partial<ListPlayerEntity>): Promise<ListPlayerEntity> {
        return new ListPlayerEntity({
            ...payload,
            created_at: new Date(),
            updated_at: new Date(),
        });
    }

    static async fromUpdateUseCase(payload: Partial<ListPlayerEntity>): Promise<ListPlayerEntity> {
        return new ListPlayerEntity({
            ...payload,
            updated_at: new Date(),
        });
    }

    static async fromPersistence(payload: Partial<ListPlayerEntity>): Promise<ListPlayerEntity> {
        return new ListPlayerEntity({
            ...payload
        });
    }

    private getUserStatus(status: string): string {
        try {
            return PlayerStatusVO.fromString(status); 
        } catch (error) {
            throw new Error(`Invalid player status: ${status}`);
        }
    }

    public createPayload() {
        return {
            list_base_id: this.list_base_id,
            player_status: this.player_status,
            users_id: this.users_id,
            guest_id: this.guest_id,
            created_at: this.created_at,
            updated_at: this.updated_at,
        }
    }

    public updatePayload() {
        return {
            id: this.id,
            list_base_id: this.list_base_id,
            player_status: this.player_status,
            users_id: this.users_id,
            guest_id: this.guest_id,
            updated_at: this.updated_at,
        }
    }

}