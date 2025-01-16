import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { GroupVisibilityHelper } from "../../../enums/GroupVisibilitEnum";
import { SportTypeHelper } from "../../../enums/SportTypeEnum";

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

    public static fromEntity(entity: GroupEntity): GroupOutputDTO { 
        return new GroupOutputDTO(entity);
    }

    // TODO: criar util de data
    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    toJSON(){
        const sportType = SportTypeHelper.fromString(this.sportType);
        const visibility = GroupVisibilityHelper.fromString(this.visibility);
        
        return {
            id: this.id,
            description: this.description,
            sportType: SportTypeHelper.parseSportName(sportType),
            visibility: GroupVisibilityHelper.parseVisibilityName(visibility),
            isActive: this.isActive,
            createdAt: this.formatDate(this.createdAt)
        }
    }   
    
}