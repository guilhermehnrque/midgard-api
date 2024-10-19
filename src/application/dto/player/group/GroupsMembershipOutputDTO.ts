
export class GroupsMembershipOutputDTO {

    private readonly description: string;
    private readonly status: boolean;
    private readonly sportType: string;
    private readonly visibility: string;
    private readonly id: number;

    constructor(description: string,
        status: boolean,
        sportType: string,
        visibility: string,
        id: number
    ) {
        this.description = description;
        this.status = status;
        this.sportType = sportType;
        this.visibility = visibility;
        this.id = id;
    }

}