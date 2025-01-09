import { UserEntity } from '../entity/UserEntity';
import { User as UserModel } from '../models/UserModel';

export interface UserRepositoryInterface {
    createUser(user: UserEntity): Promise<UserModel>;
    updateUser(user: UserEntity): Promise<number>;
    getUserByUserId(userId: string): Promise<UserModel | null>;
    getUserByPK(userId: number): Promise<UserModel | null>;
    getUserByLogin(login: string): Promise<UserModel | null>;
    getUserByResetPasswordToken(token: string): Promise<UserModel | null>;
    getUserByEmailOrLogin(userEmail: string, userLogin: string): Promise<UserModel | null>;
}
