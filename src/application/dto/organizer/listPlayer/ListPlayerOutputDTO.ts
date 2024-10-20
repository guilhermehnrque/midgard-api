export class ListPlayerOutputDTO {
    id: number;            
    status: string;         
    fullName: string;  
    
    constructor(id: number, status: string, fullName: string) {
        this.id = id;
        this.status = status;
        this.fullName = fullName;
    }

}