export interface JwtTokenAttributes {
    id?: number;
    users_id: number;
    token: string;
    expires_at: Date;
    revoked: boolean;
    revoked_at?: Date | null;
    created_at: Date;
    updated_at: Date;
}