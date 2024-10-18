export class LocalDTO {
    
    public country: string;
    public state: string;
    public city: string;
    public street: string;
    public number: number;
    public zipCode: number;
    public description: string;
    public groupsId: number;

    constructor(payload: {
        country: string;
        state: string;
        city: string;
        street: string;
        number: number;
        zipCode: number;
        description: string ;
        groupsId: number;
    }) {
        this.country = payload.country;
        this.state = payload.state;
        this.city = payload.city;
        this.street = payload.street;
        this.number = payload.number;
        this.zipCode = payload.zipCode;
        this.description = payload.description;
        this.groupsId = payload.groupsId;
    }

    // Getters
    public getCountry(): string {
        return this.country;
    }

    public getState(): string {
        return this.state;
    }

    public getCity(): string {
        return this.city;
    }

    public getStreet(): string {
        return this.street;
    }

    public getNumber(): number {
        return this.number;
    }

    public getZipCode(): number {
        return this.zipCode;
    }

    public getDescription(): string {
        return this.description;
    }

    public getGroupId(): number {
        return this.groupsId;
    }

    // Setter
    public setGroupId(groupsId: number) {
        this.groupsId = groupsId;
    }

    public payloadToCreate() {
        return {
            country: this.country,
            state: this.state,
            city: this.city,
            street: this.street,
            number: this.number,
            zip_code: this.zipCode,
            description: this.description,
            groups_id: this.groupsId
        };
    }
}
