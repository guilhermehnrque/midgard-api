import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { MemberOutputDTO } from "./MemberOutputDTO";

export class GroupMemberOutputDTO {

    public id: number;
    public description: string;
    public sportType: string;
    public visibility: string;
    public isActive: boolean;
    public createdAt: Date;
    public members?: MemberOutputDTO[];

    constructor(group: GroupEntity) {
        this.id = group.id!;
        this.description = group.description!;
        this.sportType = group.sport_type!;
        this.visibility = group.visibility!;
        this.isActive = group.is_active!;
        this.createdAt = group.created_at;
    }

    public static fromEntity(entity: GroupEntity, members: MemberOutputDTO[]): GroupMemberOutputDTO { 
        const groupDTO = new GroupMemberOutputDTO(entity);
        groupDTO.members = members;

        return groupDTO;
    }
    
}