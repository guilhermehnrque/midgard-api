export interface ListBaseAttributes {
    id?: number;
    status: boolean;
    player_limit: number;
    starting_time: string;
    ending_time: string;
    day_of_week: string;
    players_confirmed?: number;
    groups_id: number;
    locals_id: number;
    created_at: Date;
    updated_at: Date;
}