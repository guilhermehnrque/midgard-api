export interface UpdateListRequest {
    status: boolean;
    limitOfPlayers: number;
    startingTime: string;
    endingTime: string;
    dayOfWeek: string;
    groupId: number;
    localId: number;
}