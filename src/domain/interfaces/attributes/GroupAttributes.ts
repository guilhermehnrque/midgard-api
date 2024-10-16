export interface GroupAttributes {
    id?: number;
    description: string;
    is_active: boolean;
    users_id: number;
    visibility: string;
    sport_type: string;
    created_at: Date;
    updated_at: Date;
}
