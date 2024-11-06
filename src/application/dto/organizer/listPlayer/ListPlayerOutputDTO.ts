export class ListPlayerOutputDTO {
    playerListId: number;
    playerId: number;            
    status: string;         
    fullName: string;  
    
    constructor(id: number, playerId: number, status: string, fullName: string) {
        this.playerListId = id;
        this.playerId = playerId;
        this.status = status;
        this.fullName = fullName;
    }

}