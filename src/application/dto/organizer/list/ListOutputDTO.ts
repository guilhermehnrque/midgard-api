import { ListBaseEntity } from "../../../../domain/entity/ListBaseEntity";
export class ListOutputDTO {
    private readonly id: number;
    private readonly status: boolean;
    private readonly playerLimit: number;
    private readonly startingTime: string;
    private readonly endingTime: string;
    private readonly dayOfWeek: string;
    private readonly groupId: number;
    private readonly localId: number;
    private readonly createdAt: Date;

    constructor(
        id: number,
        status: boolean,
        playerLimit: number,
        startingTime: string,
        endingTime: string,
        dayOfWeek: string,
        groupId: number,
        localId: number,
        createdAt: Date
    ) {
        this.id = id;
        this.status = status;
        this.playerLimit = playerLimit;
        this.startingTime = startingTime;
        this.endingTime = endingTime;
        this.dayOfWeek = dayOfWeek;
        this.groupId = groupId;
        this.localId = localId;
        this.createdAt = createdAt;
    }

    // Getters
    public getId(): number {
        return this.id;
    }

    public getStatus(): boolean {
        return this.status;
    }

    public getPlayerLimit(): number {
        return this.playerLimit;
    }

    public getStartingTime(): string {
        return this.startingTime;
    }

    public getEndingTime(): string {
        return this.endingTime;
    }

    public getDayOfWeek(): string {
        return this.dayOfWeek;
    }

    public getGroupId(): number {
        return this.groupId;
    }

    public getLocalId(): number {
        return this.localId;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public static fromEntity(entity: ListBaseEntity): ListOutputDTO {
        return new ListOutputDTO(
            entity.id!,
            entity.status,
            entity.player_limit,
            entity.starting_time,
            entity.ending_time,
            entity.day_of_week,
            entity.groups_id,
            entity.locals_id,
            entity.created_at,
        );
    }

    public static fromEntities(entities: ListBaseEntity[]): ListOutputDTO[] {
        return entities.map(entity => ListOutputDTO.fromEntity(entity));
    }
}
