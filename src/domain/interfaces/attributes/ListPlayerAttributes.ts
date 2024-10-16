export interface ListPlayerAttributes {
    id?: number;
    list_base_id: number;
    player_status: string;
    users_id?: number | null;
    guest_id?: number | null;
    created_at: Date;
    updated_at: Date;
}
