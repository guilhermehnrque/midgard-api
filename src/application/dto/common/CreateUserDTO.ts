export class CreateUserDTO {
    public name: string;
    public surname: string;
    public email: string;
    public type: string;
    public phone_number: number;
    public login: string;
    public password: string;

    constructor(name: string, surname: string, email: string, type: string, phone_number: number, login: string, password: string) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.type = type;
        this.phone_number = phone_number;
        this.login = login;
        this.password = password;
    }
}