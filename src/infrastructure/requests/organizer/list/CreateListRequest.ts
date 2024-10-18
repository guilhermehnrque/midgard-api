export interface CreateListRequest {
    status: boolean;
    limitOfPlayers: number;
    startingTime: string;
    endingTime: string;
    dayOfWeek: string;
    groupId: number;
    localId: number;
}