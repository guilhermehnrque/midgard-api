import { ScheduleEntity } from "../../domain/entity/ScheduleEntity";
import { Schedule } from "../../domain/models/ScheduleModel";
import { ScheduleRepositoryImpl } from "../../infrastructure/repositories/ScheduleRepositoryImpl";
import { CustomError } from "../erros/CustomError";
import { InternalError } from "../erros/InternalError";
import { ScheduleAlreadyExistsError } from "../erros/schedules/ScheduleAlreadyExistsError";
import { ScheduleNotFoundError } from "../erros/schedules/ScheduleNotFoundError";

export class SchedulesService {

    private readonly scheduleRepository: ScheduleRepositoryImpl;

    constructor() {
        this.scheduleRepository = new ScheduleRepositoryImpl();
    }

    async createSchedule(scheduleEntity: ScheduleEntity): Promise<void> {
        try {
            await this.scheduleRepository.createSchedule(scheduleEntity);
        } catch (error) {
            const customError = error as CustomError;
            this.logAndThrowError(new InternalError(), `[SchedulesService] createSchedule -> ${customError.message}`);
        }
    }

    async updateSchedule(scheduleEntity: ScheduleEntity): Promise<void> { 
        try {
            await this.scheduleRepository.updateSchedule(scheduleEntity);
        } catch (error) {
            const customError = error as CustomError;
            this.logAndThrowError(new InternalError(), `[SchedulesService] updateSchedule -> ${customError.message}`);
        }
    }

    async getScheduleById(scheduleId: number): Promise<ScheduleEntity> {
        const schedule = await this.scheduleRepository.getScheduleById(scheduleId);

        if (!schedule || schedule == null) {
            this.logAndThrowError(new ScheduleNotFoundError(), `[SchedulesService] getScheduleById -> ${scheduleId}`);
        }

        return this.createEntityFromPersistence(schedule!);
    }


    async getScheduleByIdAndGroupId(scheduleId: number, groupIdPk: number): Promise<ScheduleEntity> {
        const schedule = await this.scheduleRepository.getScheduleByIdAndGroupId(scheduleId, groupIdPk);

        if (!schedule || schedule == null) {
            this.logAndThrowError(new ScheduleNotFoundError(), `[SchedulesService] getScheduleByIdAndGroupId -> ${scheduleId}`);
        }

        return this.createEntityFromPersistence(schedule!);
    }

    async getScheduleByGroupId(groupId: number): Promise<ScheduleEntity[]> {
        const schedule = await this.scheduleRepository.getSchedulesGroupId(groupId);

        if (!schedule) {
            return [];
        }

        return await Promise.all(schedule.map(this.createEntityFromPersistence));
    }

    async getScheduleByTimesAndGroupId(startingTime: string, endingTime: string, dayOfWeek: string, groupIdPk: number): Promise<ScheduleEntity> {
        const schedule = await this.scheduleRepository.getScheduleByTimesAndGroupId(startingTime, endingTime, dayOfWeek, groupIdPk);

        if (!schedule || schedule == null) {
            this.logAndThrowError(new ScheduleAlreadyExistsError(), `[SchedulesService] getScheduleByTimesAndGroupId -> 
            ${startingTime}, ${endingTime}, ${dayOfWeek}, ${groupIdPk} `);
        }

        return this.createEntityFromPersistence(schedule!);
    }

    private async createEntityFromPersistence(schedule: Schedule): Promise<ScheduleEntity> {
        return await ScheduleEntity.fromPersistence({
            day_of_week: schedule.day_of_week,
            starting_time: schedule.starting_time,
            ending_time: schedule.ending_time,
            groups_id: schedule.groups_id,
            id: schedule.id
        });
    }

    private logAndThrowError(error: CustomError, context: string): void {
        console.error(`${context}: ${error.message}`);
        throw error;
    }

}