import { v4 as uuidv4 } from 'uuid';
import { HashPassword } from '../../application/utils/HashPassword';
import { UserAttributes } from '../interfaces/attributes/UserAttributes';

export class UserEntity implements UserAttributes {

    public id?: number;
    public user_id: string;
    public name: string;
    public surname: string;
    public type: string;
    public status: boolean;
    public phone_number: number;
    public login: string;
    public password: string;
    public created_at: Date;
    public updated_at: Date;
    public deleted_at: Date | undefined;
    public reset_password_expires: Date | null | undefined;
    public reset_password_token: string | null | undefined;

    constructor(payload: Partial<UserEntity> = {}) {
        this.user_id = payload.user_id!;
        this.name = payload.name!;
        this.surname = payload.surname!;
        this.type = payload.type!;
        this.status = payload.status!;
        this.phone_number = payload.phone_number!;
        this.login = payload.login!;
        this.password = payload.password!;
        this.created_at = payload.created_at!;
        this.updated_at = payload.updated_at!;
        this.deleted_at = payload.deleted_at!;
        this.id = payload.id;
        this.reset_password_expires = payload.reset_password_expires;
        this.reset_password_token = payload.reset_password_token;
    }

    public async cleanTokens() {
        this.reset_password_token = null;
        this.reset_password_expires = null;
    }

    public setUserIdPk(id: number) {
        this.id = id;
    }

    public getUserIdPk() {
        return this.id!;
    }

    public getUserName() {
        return this.name;
    }

    public getSurname() {
        return this.surname;
    }

    public getFullname() {
        return `${this.name} ${this.surname}`;
    }

    public setPassword(password: string) {
        this.password = password;
    }

    static async fromUseCase(payload: Partial<UserEntity>): Promise<UserEntity> {
        return new UserEntity({
            ...payload
        });
    }

    static async fromRegisterDTO(payload: Partial<UserEntity>): Promise<UserEntity> {
        const userEntity = new UserEntity();

        userEntity.user_id = uuidv4();
        userEntity.name = payload.name!;
        userEntity.surname = payload.surname!;
        userEntity.type = payload.type!;
        userEntity.status = payload.status!;
        userEntity.phone_number = payload.phone_number!;
        userEntity.login = payload.login!;
        userEntity.password = payload.password!;
        userEntity.created_at = new Date();
        userEntity.updated_at = new Date();
        userEntity.reset_password_expires = null;
        userEntity.reset_password_token = null;

        return userEntity;
    }

    public registerPayload() {
        return {
            name: this.name,
            surname: this.surname,
            type: this.type,
            status: this.status,
            phone_number: this.phone_number,
            login: this.login,
            password: this.password,
            user_id: this.user_id
        }
    }

    public updatePayload() {
        return {
            name: this.name,
            surname: this.surname,
            type: this.type,
            status: this.status,
            phone_number: this.phone_number,
            login: this.login,
            password: this.password,
            updated_at: new Date()
        }
    }

    toJSON() {
        return {
            id: this.id,
            user_id: this.user_id,
            name: this.name,
            type: this.type,
            login: this.login,
        }
    }

}
