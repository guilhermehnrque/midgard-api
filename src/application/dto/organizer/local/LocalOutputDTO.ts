import { LocalEntity } from "../../../../domain/entity/LocalEntity";

export class LocalOutputDTO {
    public id: number;
    public country: string;
    public state: string;
    public city: string;
    public street: string;
    public number: number;
    public zipCode: number;
    public description: string;
    public groupsId: number;
    public createdAt: Date;

    constructor(payload: Partial<LocalEntity>) {
        this.id = payload.id!;
        this.country = payload.country!;
        this.state = payload.state!;
        this.city = payload.city!;
        this.street = payload.street!;
        this.number = payload.number!;
        this.zipCode = payload.zip_code!;
        this.description = payload.description!;
        this.groupsId = payload.groups_id!;
        this.createdAt = payload.created_at!;
    }

    public static fromEntities(payload: LocalEntity[]): LocalOutputDTO[] {
        return payload.map(local => new LocalOutputDTO(local));
    }

    public static fromEntity(entity: LocalEntity): LocalOutputDTO { 
        return new LocalOutputDTO(entity);
    }

}
