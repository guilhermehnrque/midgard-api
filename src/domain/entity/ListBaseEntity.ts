import { getDayOfWeekByString } from "../../application/enums/DayOfWeekEnum";
import { ListBaseAttributes } from "../interfaces/attributes/ListBaseAttributes";

export class ListBaseEntity implements ListBaseAttributes {

    public id?: number;
    public status: boolean;
    public player_limit: number;
    public starting_time: string;
    public ending_time: string;
    public day_of_week: string;
    public groups_id: number;
    public locals_id: number;
    public created_at: Date;
    public updated_at: Date;

    constructor(payload: Partial<ListBaseEntity>) {
        this.status = payload.status!;
        this.starting_time = this.addSecondsToHour(payload.starting_time!);
        this.ending_time = this.addSecondsToHour(payload.ending_time!);
        this.day_of_week = this.dayOfWeekByString(payload.day_of_week!);
        this.player_limit = payload.player_limit!;
        this.locals_id = payload.locals_id!;
        this.created_at = payload.created_at!;
        this.updated_at = payload.updated_at!;
        this.groups_id = payload.groups_id!;
        this.id = payload.id;

        this.validations();
    }

    static async fromCreateUseCase(payload: Partial<ListBaseEntity>): Promise<ListBaseEntity> {
        return new ListBaseEntity({
            ...payload,
            created_at: new Date(),
            updated_at: new Date(),
        });
    }

    static async fromUpdateUseCase(payload: Partial<ListBaseEntity>): Promise<ListBaseEntity> {
        return new ListBaseEntity({
            ...payload,
            updated_at: new Date(),
        });
    }

    static async fromPersistence(payload: Partial<ListBaseEntity>): Promise<ListBaseEntity> {
        return new ListBaseEntity({
            ...payload
        });
    }

    public validations(): void {
        const validateHour = this.validateTimeFormat(this.starting_time) && this.validateTimeFormat(this.ending_time);

        if (!validateHour) {
            throw new Error('Invalid hour format');
        }
    }

    private validateTimeFormat(hour: string): boolean {
        const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
        return regex.test(hour);
    }

    public addSecondsToHour(hour: string): string {
        if (/^\d{2}:\d{2}:\d{2}$/.test(hour)) {
            return hour;
        }

        return `${hour}:00`;
    }

    private dayOfWeekByString(dayOfWeek: string): string {
        return getDayOfWeekByString(dayOfWeek)!.toString().toUpperCase();
    }


    public createPayload() {
        return {
            status: this.status,
            player_limit: this.player_limit,
            starting_time: this.starting_time,
            ending_time: this.ending_time,
            day_of_week: this.day_of_week,
            locals_id: this.locals_id,
            groups_id: this.groups_id,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }

    public updatePayload() {
        return {
            id: this.id,
            status: this.status,
            player_limit: this.player_limit,
            starting_time: this.starting_time,
            ending_time: this.ending_time,
            day_of_week: this.day_of_week,
            locals_id: this.locals_id,
            groups_id: this.groups_id,
            updated_at: this.updated_at
        };
    }

}