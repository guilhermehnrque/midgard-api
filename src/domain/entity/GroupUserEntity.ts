import { GroupUserAttributes } from "../interfaces/attributes/GroupUserAttributes";

export class GroupUserEntity implements GroupUserAttributes {
    public id?: number;
    public groups_id: number;
    public users_id: number;

    constructor(payload: Partial<GroupUserEntity>) {
        this.groups_id = payload.groups_id!;
        this.users_id = payload.users_id!;
        this.id = payload.id;
    }

    static async fromData(payload: Partial<GroupUserEntity>): Promise<GroupUserEntity> {
        return new GroupUserEntity({
            ...payload
        });
    }

    public registerPayload() {
        return {
            groups_id: this.groups_id,
            users_id: this.users_id
        }
    }
}
