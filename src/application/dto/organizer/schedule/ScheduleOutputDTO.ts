import { ScheduleEntity } from "../../../../domain/entity/ScheduleEntity";
import { DayOfWeekHelper } from "../../../enums/DayOfWeekEnum"

export class ScheduleOutputDTO {

    public id: number;
    public startingTime: string;
    public endingTime: string;
    public dayOfWeek: string;
    public createdAt: string;

    constructor(payload: ScheduleEntity) {
        this.startingTime = payload.starting_time;
        this.endingTime = payload.ending_time;
        this.dayOfWeek = DayOfWeekHelper.fromString(payload.day_of_week);
        this.createdAt = payload.created_at.toISOString();
        this.id = payload.id!;
    }

    public static fromEntity(entity: ScheduleEntity): ScheduleOutputDTO {
        return new ScheduleOutputDTO(entity);
    }

    public static fromEntities(entities: ScheduleEntity[]): ScheduleOutputDTO[] {
        return entities.map(entity => new ScheduleOutputDTO(entity));
    }

}