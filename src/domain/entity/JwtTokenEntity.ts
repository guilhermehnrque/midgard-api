import { JwtTokenAttributes } from "../interfaces/attributes/JwtTokenAttributes";

export class JwtTokenEntity implements JwtTokenAttributes {

    public id?: number;
    public users_id!: number;
    public token!: string;
    public expires_at!: Date;
    public revoked: boolean;
    public revoked_at?: Date | null;
    public created_at!: Date;
    public updated_at!: Date;

    constructor(
        payload: Partial<JwtTokenEntity> = {},
    ) {
        this.users_id = payload.users_id!;
        this.token = payload.token!;
        this.expires_at = payload.expires_at!;
        this.revoked = payload.revoked!;
        this.revoked_at = payload.revoked_at;
        this.created_at = payload.created_at!;
        this.updated_at = payload.updated_at!;
    }

    private readonly DAYS_TO_EXPIRE = +process.env.DAYS_TO_EXPIRE_DAY!;

    static async createFromPayload(payload: Partial<JwtTokenEntity>): Promise<JwtTokenEntity> {
        const jwtTokenEntityInstance = new JwtTokenEntity();
        const expirationDate = await jwtTokenEntityInstance.createDayToExpire();

        return new JwtTokenEntity({
            users_id: payload.users_id!,
            token: payload.token!,
            expires_at: expirationDate,
            revoked: false,
            revoked_at: null,
            created_at: new Date(),
            updated_at: new Date(),
        });
    }


    static async createFromPersistance(payload: Partial<JwtTokenEntity>): Promise<JwtTokenEntity> {
        return new JwtTokenEntity({
            id: payload.id,
            users_id: payload.users_id!,
            token: payload.token!,
            expires_at: payload.expires_at,
            revoked: payload.revoked!,
            revoked_at: payload.revoked_at,
            created_at: payload.created_at,
            updated_at: payload.updated_at,
        });
    }

    private async createDayToExpire(): Promise<Date> {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + this.DAYS_TO_EXPIRE);
        return expirationDate;
    }

    public registerPayload() {
        return {
            users_id: this.users_id,
            token: this.token,
            revoked: this.revoked,
            expires_at: this.expires_at,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }

    public updatePayload() {
        return {
            id: this.id,
            users_id: this.users_id,
            token: this.token,
            expires_at: this.expires_at,
            revoked: this.revoked,
            revoked_at: this.revoked_at,
            updated_at: this.updated_at,
        }
    }
}
