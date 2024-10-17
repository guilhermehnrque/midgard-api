import { ListBaseEntity } from "../../../../domain/entity/ListBaseEntity";

export class ListOutputDTO {
    private readonly _id: number;
    private readonly _status: boolean;
    private readonly _playerLimit: number;
    private readonly _startingTime: string;
    private readonly _endingTime: string;
    private readonly _dayOfWeek: string;
    private readonly _groupId: number;
    private readonly _localId: number;
    private readonly _createdAt: Date;

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
        this._id = id;
        this._status = status;
        this._playerLimit = playerLimit;
        this._startingTime = startingTime;
        this._endingTime = endingTime;
        this._dayOfWeek = dayOfWeek;
        this._groupId = groupId;
        this._localId = localId;
        this._createdAt = createdAt;
    }

    // Getters
    public get id(): number {
        return this._id;
    }

    public get status(): boolean {
        return this._status;
    }

    public get playerLimit(): number {
        return this._playerLimit;
    }

    public get startingTime(): string {
        return this._startingTime;
    }

    public get endingTime(): string {
        return this._endingTime;
    }

    public get dayOfWeek(): string {
        return this._dayOfWeek;
    }

    public get groupId(): number {
        return this._groupId;
    }

    public get localId(): number {
        return this._localId;
    }

    public get createdAt(): Date {
        return this._createdAt;
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
