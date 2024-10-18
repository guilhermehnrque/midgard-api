export class ListDTO {

    private _status: boolean;
    private _playerLimit: number;
    private _startingTime: string;
    private _endingTime: string;
    private _dayOfWeek: string;
    private _groupId: number;
    private _localId: number;

    constructor(
        status: boolean,
        playerLimit: number,
        startingTime: string,
        endingTime: string,
        dayOfWeek: string,
        groupId: number,
        localId: number,
    ) {
        this._status = status;
        this._playerLimit = playerLimit;
        this._startingTime = startingTime;
        this._endingTime = endingTime;
        this._dayOfWeek = dayOfWeek;
        this._groupId = groupId;
        this._localId = localId;
    }

    // Getters
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

    // Setters
    public set status(value: boolean) {
        this._status = value;
    }

    public set playerLimit(value: number) {
        this._playerLimit = value;
    }

    public set startingTime(value: string) {
        this._startingTime = value;
    }

    public set endingTime(value: string) {
        this._endingTime = value;
    }

    public set dayOfWeek(value: string) {
        this._dayOfWeek = value;
    }

    public set groupId(value: number) {
        this._groupId = value;
    }

    public set localId(value: number) {
        this._localId = value;
    }

}