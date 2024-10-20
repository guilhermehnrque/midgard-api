import { Schedule } from "../../domain/models/ScheduleModel";
import { ScheduleEntity } from "../../domain/entity/ScheduleEntity";
import { CustomError } from "../../application/erros/CustomError";
import { DatabaseError } from "../../application/erros/DatabaseError";
import { ScheduleRepositoryInterface } from "../../domain/repositories/ScheduleRepositoryInterface";
import { Op } from "sequelize";

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

    async getScheduleByIdAndGroupId(scheduleId: number, groupIdPk: number): Promise<Schedule | null> {
        try {
            return await Schedule.findOne({
                where: {
                    id: scheduleId,
                    groups_id: groupIdPk
                }
            });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[ScheduleRepositoryImpl] getScheduleById -> ${customError.message}`);
        }
    }

    async getSchedulesGroupId(groupId: number): Promise<Schedule[] | null> {
        try {
            return await Schedule.findAll({
                where: {
                    groups_id: groupId,
                }
            });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[ScheduleRepositoryImpl] getSchedulesByGroup -> ${customError.message}`);
        }

    }

    public async checkScheduleConflictOnDay(dayOfWeek: string, startingTime: string, endingTime: string): Promise<boolean> {
        try {
            const conflictingSchedules = await Schedule.findAll({
                where: {
                    day_of_week: dayOfWeek, 
                    [Op.or]: [
                        {
                            starting_time: {
                                [Op.lt]: startingTime 
                            },
                            ending_time: {
                                [Op.gt]: endingTime 
                            }
                        }
                    ]
                }
            });
    
            return conflictingSchedules.length > 0;
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[ScheduleRepositoryImpl] checkScheduleConflictOnDay -> ${customError.message}`);
        }
    }

}