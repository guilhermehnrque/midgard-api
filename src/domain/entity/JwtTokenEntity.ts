import { JwtTokenAttributes } from "../interfaces/attributes/JwtTokenAttributes";

export class JwtTokenEntity implements JwtTokenAttributes {

    public id?: number;
    public users_id!: number;
    public token!: string;
    public expires_at!: Date;
    public revoked: boolean;
    public revoked_at?: Date;
    public created_at!: Date;
    public updated_at!: Date;

    constructor() {
        this.revoked = false;
    }

    private readonly DAYS_TO_EXPIRE = +process.env.DAYS_TO_EXPIRE_DAY!;

    static async createFromPayload(users_id: number, token: string): Promise<JwtTokenEntity> {
        const instance = new JwtTokenEntity();
        instance.users_id = users_id;
        instance.token = token;
        instance.expires_at = await instance.createDayToExpire();
        instance.created_at = new Date();
        instance.updated_at = new Date();

        return instance;
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
}
