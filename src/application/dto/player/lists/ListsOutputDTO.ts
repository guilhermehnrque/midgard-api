
export class ListsOutputDTO {

    private readonly id: number;
    private readonly startingTime: string;
    private readonly endingTime: string;
    private readonly dayOfWeek: string;
    private readonly confirmedPlayers: number;

    constructor(id: number, startingTime: string, endingTime: string, dayOfWeek: string, confirmedPlayers: number) {
        this.id = id;
        this.startingTime = startingTime;
        this.endingTime = endingTime;
        this.dayOfWeek = dayOfWeek;
        this.confirmedPlayers = confirmedPlayers;
    }

}