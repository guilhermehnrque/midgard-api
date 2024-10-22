export interface ScheduleAttributes {
    id?: number;
    starting_time: string;
    ending_time: string;
    day_of_week: string;
    groups_id: number;
    locals_id: number;
    created_at: Date;
    updated_at: Date;
}