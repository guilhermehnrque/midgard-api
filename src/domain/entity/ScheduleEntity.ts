import { getDayOfWeekByString } from "../../application/enums/DayOfWeekEnum";
import { ScheduleAttributes } from "../interfaces/attributes/ScheduleAttributes";

export class ScheduleEntity implements ScheduleAttributes {

    public id?: number;
    public starting_time!: string;
    public ending_time!: string;
    public day_of_week!: string;
    public groups_id!: number;
    public locals_id!: number;
    public created_at!: Date;
    public updated_at!: Date;

    constructor(payload: Partial<ScheduleEntity>) {
        this.starting_time = this.addSecondsToHour(payload.starting_time!);
        this.ending_time = this.addSecondsToHour(payload.ending_time!);
        this.day_of_week = this.dayOfWeekByString(payload.day_of_week!);
        this.groups_id = payload.groups_id!;
        this.locals_id = payload.locals_id!;
        this.created_at = payload.created_at!;
        this.updated_at = payload.updated_at!;
        this.id = payload.id;

        this.validations();
    }

    static async fromCreateUseCase(payload: Partial<ScheduleEntity>): Promise<ScheduleEntity> {
        return new ScheduleEntity({
            ...payload,
            created_at: new Date(),
            updated_at: new Date(),
        });
    }

    static async fromUpdateUseCase(payload: Partial<ScheduleEntity>): Promise<ScheduleEntity> {
        return new ScheduleEntity({
            ...payload,
            updated_at: new Date(),
        });
    }

    static async fromPersistence(payload: Partial<ScheduleEntity>): Promise<ScheduleEntity> {
        return new ScheduleEntity({
            ...payload
        });
    }

    public validations(): void {
        const validateHour = this.validateTimeFormat(this.starting_time) && this.validateTimeFormat(this.ending_time);

        if (!validateHour) {
            throw new Error('Invalid hour format');
        }
    }

    public getGroupIdPk(): number {
        return this.groups_id;
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

    public createPayload(): Partial<ScheduleEntity> {
        return {
            starting_time: this.starting_time,
            ending_time: this.ending_time,
            day_of_week: this.day_of_week,
            groups_id: this.groups_id,
            locals_id: this.locals_id,
            created_at: new Date(),
            updated_at: new Date(),
        };
    }

    public updatePayload(): Partial<ScheduleEntity> {
        return {
            id: this.id,
            starting_time: this.starting_time,
            ending_time: this.ending_time,
            day_of_week: this.day_of_week,
            locals_id: this.locals_id,
            groups_id: this.groups_id,
            updated_at: new Date(),
        };
    }
}
