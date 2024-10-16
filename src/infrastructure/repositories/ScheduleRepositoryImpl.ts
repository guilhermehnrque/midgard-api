import { Schedule } from "../../domain/models/ScheduleModel";
import { ScheduleEntity } from "../../domain/entity/ScheduleEntity";
import { CustomError } from "../../application/erros/CustomError";
import { DatabaseError } from "../../application/erros/DatabaseError";
import { ScheduleRepositoryInterface } from "../../domain/repositories/ScheduleRepositoryInterface";

export class ScheduleRepositoryImpl implements ScheduleRepositoryInterface {
    
    async createSchedule(scheduleEntity: ScheduleEntity): Promise<Schedule> {
        try {
            const schedule = Schedule.build(scheduleEntity);
            return await schedule.save();
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[ScheduleRepositoryImpl] createSchedule -> ${customError.message}`);
        }
    }

    async updateSchedule(scheduleEntity: ScheduleEntity): Promise<number> {
        const updatePayload = scheduleEntity.updatePayload();
        try {
            const [affectedCount] = await Schedule.update(updatePayload, {
                where: {
                    id: updatePayload.id
                }
            });

            return affectedCount;
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[ScheduleRepositoryImpl] updateSchedule -> ${customError.message}`);
        }
    }

    async getScheduleById(scheduleId: number): Promise<Schedule | null> {
        try {
            return await Schedule.findByPk(scheduleId);
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[ScheduleRepositoryImpl] getScheduleById -> ${customError.message}`);
        }
    }

    async getSchedulesGroupId(groupId: number): Promise<Schedule | null> {
        try {
            return await Schedule.findOne({
                where: {
                    groups_id: groupId,
                }
            });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[ScheduleRepositoryImpl] getSchedulesByGroup -> ${customError.message}`);
        }

    }

}