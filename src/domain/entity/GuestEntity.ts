import { GuestAttributes } from "../interfaces/attributes/GuestAttributes";

export class GuestEntity implements GuestAttributes {
    public id?: number;
    public name: string;
    public users_id: number;

    constructor(payload: Partial<GuestEntity>) {
        this.name = payload.name!;
        this.users_id = payload.users_id!;
    }

    static async fromData(payload: Partial<GuestEntity>): Promise<GuestEntity> {
        return new GuestEntity({
            ...payload
        });
    }

    public createPayload() {
        return {
            name: this.name,
            users_id: this.users_id,
        }
    }

    public updatePayload() {
        return {
            name: this.name,
        }
    }
}
