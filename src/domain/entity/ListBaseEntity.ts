import { ListDTO } from "../../application/dto/organizer/list/ListDTO";
import { DayOfWeekHelper } from "../../application/enums/DayOfWeekEnum";
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
    public players_confirmed?: number;

    constructor(payload: Partial<ListBaseEntity> = {}) {
        this.status = payload.status!;
        this.starting_time = payload.starting_time!;
        this.ending_time = payload.ending_time!;
        this.day_of_week = payload.day_of_week!;
        this.player_limit = payload.player_limit!;
        this.locals_id = payload.locals_id!;
        this.created_at = payload.created_at!;
        this.updated_at = payload.updated_at!;
        this.groups_id = payload.groups_id!;
        this.id = payload.id;
        this.players_confirmed = payload.players_confirmed ? payload.players_confirmed : 0;
    }

    static fromCreateUseCase(payload: ListDTO): ListBaseEntity {
        const entity = new ListBaseEntity();

        entity.validateTimeFormat(payload.startingTime)
        entity.validateTimeFormat(payload.endingTime)

        entity.status = true;
        entity.player_limit = payload.playerLimit;
        entity.starting_time = entity.addSecondsToHour(payload.startingTime);
        entity.ending_time = entity.addSecondsToHour(payload.endingTime);
        entity.day_of_week = entity.dayOfWeekByString(payload.dayOfWeek.toLowerCase());
        entity.groups_id = payload.groupId;
        entity.locals_id = payload.localId;
        entity.created_at = new Date();
        entity.updated_at = new Date();

        return entity;
    }

    static fromUpdateUseCase(payload: ListDTO, listIdPk: number): ListBaseEntity {
        const entity = new ListBaseEntity();

        entity.validateTimeFormat(payload.startingTime)
        entity.validateTimeFormat(payload.endingTime)

        entity.id = listIdPk;
        entity.status = payload.status;
        entity.player_limit = payload.playerLimit;
        entity.starting_time = entity.addSecondsToHour(payload.startingTime);
        entity.ending_time = entity.addSecondsToHour(payload.endingTime);
        entity.day_of_week = entity.dayOfWeekByString(payload.dayOfWeek.toLowerCase());
        entity.groups_id = payload.groupId;
        entity.locals_id = payload.localId;

        entity.updated_at = new Date();

        return entity;
    }

    static async fromPersistence(payload: Partial<ListBaseEntity>): Promise<ListBaseEntity> {
        return new ListBaseEntity({
            ...payload
        });
    }

    private validateTimeFormat(hour: string): void {
        const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;

        if (!(regex.test(hour))) {
            console.error(`[ListBaseEntity] -> Invalid hour format: ${hour}`);
            throw new Error('Invalid hour format');
        }
    }

    public addSecondsToHour(hour: string): string {
        if (/^\d{2}:\d{2}:\d{2}$/.test(hour)) {
            return hour;
        }

        return `${hour}:00`;
    }

    private dayOfWeekByString(dayOfWeek: string): string {
        return DayOfWeekHelper.fromString(dayOfWeek.toUpperCase()).toString().toUpperCase();
    }
    public getListIdPk(): number {
        return this.id!;
    }

    public getStatus(): boolean {
        return this.status;    
    }

    public getGroupIdPk(): number {
        return this.groups_id;
    }

    public getPlayerLimit(): number {
        return this.player_limit;
    }

    public setConfirmedPlayers(value: number) {
        this.players_confirmed = value;
    }

    public getConfirmedPlayers(): number {
        return this.players_confirmed!;
    }

    public isListActive(): boolean {
        return this.status;
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