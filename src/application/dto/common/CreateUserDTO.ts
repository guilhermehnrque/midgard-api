export class CreateUserDTO {
    public name: string;
    public surname: string;
    public type: string;
    public status: boolean;
    public phone_number: number;
    public login: string;
    public password: string;

    constructor(name: string, surname: string, type: string, status: boolean, phone_number: number, login: string, password: string) {
        this.name = name;
        this.surname = surname;
        this.type = type;
        this.status = status;
        this.phone_number = phone_number;
        this.login = login;
        this.password = password;
    }

    public payloadToCreate() {
        return {
            name: this.name,
            surname: this.surname,
            type: this.type,
            status: this.status,
            phone_number: this.phone_number,
            login: this.login,
            password: this.password
        };
    }
}