import { GroupEntity } from "../../../../domain/entity/GroupEntity";

export class GroupOutputDTO {

    id: number;
    description: string;
    sportType: string;
    visibility: string;
    isActive: boolean;
    createdAt: Date;

    constructor(group: GroupEntity) {
        this.id = group.id!;
        this.description = group.description!;
        this.sportType = group.sport_type!;
        this.visibility = group.visibility!;
        this.isActive = group.is_active!;
        this.createdAt = group.created_at;
    }

    public static fromEntities(groups: GroupEntity[]): GroupOutputDTO[] {
        return groups.map(group => new GroupOutputDTO(group));
    }
    
}