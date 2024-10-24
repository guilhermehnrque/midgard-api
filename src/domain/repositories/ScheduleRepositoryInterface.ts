import { ScheduleEntity } from "../entity/ScheduleEntity";
import { Schedule } from "../models/ScheduleModel";

export interface ScheduleRepositoryInterface {
    createSchedule(scheduleEntity: ScheduleEntity): Promise<Schedule>;
    updateSchedule(scheduleEntity: ScheduleEntity): Promise<number>;
    getScheduleById(scheduleId: number): Promise<Schedule | null>;
    getScheduleByIdAndGroupId(scheduleId: number, groupIdPk: number): Promise<Schedule | null>;
    getSchedulesGroupId(groupId: number): Promise<Schedule[] | null>;
    checkScheduleConflictOnDay(dayOfWeek: string, startingTime: string, endingTime: string): Promise<boolean>
}