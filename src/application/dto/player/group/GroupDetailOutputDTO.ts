import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { LocalEntity } from "../../../../domain/entity/LocalEntity";
import { ScheduleEntity } from "../../../../domain/entity/ScheduleEntity";

export class GroupDetailOutputDTO {

    private readonly id!: number;
    private readonly description!: string;
    private readonly sportType!: string;
    private readonly visibility!: string;
    private readonly isActive!: boolean;
    private readonly createdAt!: Date;

    private readonly schedules!: ScheduleEntity[];
    private readonly locals!: LocalEntity[];

    constructor(group: GroupEntity, schedules: ScheduleEntity[], locals: LocalEntity[]) {
        this.id = group.id!;
        this.description = group.description;
        this.sportType = group.sport_type;
        this.visibility = group.visibility;
        this.isActive = group.is_active;
        this.createdAt = group.created_at;
        this.schedules = schedules;
        this.locals = locals;
    }

    public static fromEntities(group: GroupEntity, schedules: ScheduleEntity[], locals: LocalEntity[]): GroupDetailOutputDTO {
        return new GroupDetailOutputDTO(group, schedules, locals);
    }

    public toObject() {
        return {
            group: {
                id: this.id,
                description: this.description,
                sportType: this.sportType,
                visibility: this.visibility,
                isActive: this.isActive,
                createdAt: this.createdAt,
                locals: this.locals.map(local => ({
                    id: local.id,
                    description: local.description,
                    address: local.getFullAddress(),
                    schedules: this.schedules
                        .filter(schedule => schedule.locals_id === local.id) 
                        .map(schedule => ({
                            id: schedule.id,
                            startTime: schedule.starting_time,
                            endTime: schedule.ending_time,
                            day: schedule.day_of_week
                        }))
                }))
            }
        };
    }
}
