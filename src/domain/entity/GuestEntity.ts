import { GuestAttributes } from "../interfaces/attributes/GuestAttributes";

export class GuestEntity implements GuestAttributes {
    public id?: number;
    public guest_name: string;
    public users_id: number;

    constructor(payload: Partial<GuestEntity>) {
        this.guest_name = payload.guest_name!;
        this.users_id = payload.users_id!;
    }

    static async fromData(payload: Partial<GuestEntity>): Promise<GuestEntity> {
        return new GuestEntity({
            ...payload
        });
    }

    public createPayload() {
        return {
            guest_name: this.guest_name,
            users_id: this.users_id,
        }
    }

    public updatePayload() {
        return {
            guest_name: this.guest_name,
        }
    }
}
