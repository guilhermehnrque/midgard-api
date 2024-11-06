import { UserEntity } from "../../domain/entity/UserEntity";
import { User } from "../../domain/models/UserModel";
import { UserRepositoryImpl } from "../../infrastructure/repositories/UserRepositoryImpl";
import { CustomError } from "../erros/CustomError";
import { InternalError } from "../erros/InternalError";
import { UserAlreadyExistsError } from "../erros/UserAlreadyExistsError";
import { UserNotFoundError } from "../erros/UserNotFoundError";

export class UserService {

    private readonly userRepository: UserRepositoryImpl;

    constructor() {
        this.userRepository = new UserRepositoryImpl();
    }

    async createUser(user: UserEntity): Promise<void> {
        await this.ensureUserNotExists(user.phone_number);

        try {
            await this.userRepository.createUser(user);
        } catch (error) {
            const customError = error as CustomError;
            this.logAndThrowError(new InternalError(), `[UserService] createUser -> ${customError.message}`);
        }
    }

    async updateUser(user: UserEntity): Promise<number> {
        await this.ensureUserExists(user.phone_number)

        try {
            return await this.userRepository.updateUser(user);
        } catch (error) {
            const customError = error as CustomError;
            this.logAndThrowError(new InternalError(), `[UserService] updateUser -> ${customError.message}`);
            return 0;
        }
    }

    public async getUserByLogin(login: string): Promise<UserEntity | null> {
        const user = await this.userRepository.getUserByLogin(login);

        if (!user || user == null) {    
            return null;
        }

        return await this.createEntityFromPersistance(user);
    }

    async getUserByPhone(phone: number): Promise<UserEntity | null> {
        const user = await this.userRepository.getUserByPhone(phone);

        if (!user || user == null) {
            return null;
        }

        return await this.createEntityFromPersistance(user);
    }

    async getUserByUserId(userId: string): Promise<UserEntity> {
        const user = await this.userRepository.getUserByUserId(userId);

        if (!user) {
            this.logAndThrowError(new UserNotFoundError(), `[UserService] getUserByUserId -> ${userId}`);
        }

        return await this.createEntityFromPersistance(user!);
    }


    async getUserByIdPk(userIdPk: number): Promise<UserEntity> {
        const user = await this.userRepository.getUserByPK(userIdPk);

        if (!user) {
            this.logAndThrowError(new UserNotFoundError(), `[UserService] getUserByIdPk -> ${userIdPk}`);
        }

        return await this.createEntityFromPersistance(user!);
    }

    public async getUserByResetToken(token: string): Promise<UserEntity | null> {
        const user = await this.userRepository.getUserByResetPasswordToken(token);

        if (!user || user == null) {
            return null;
        }

        return await this.createEntityFromPersistance(user);
    }

    private async getUserByPhoneNumber(phoneNumber: number): Promise<User | null> {
        return await this.userRepository.getUserByPhone(phoneNumber);
    }

    private async ensureUserNotExists(phoneNumber: number): Promise<void> {
        const user = await this.getUserByPhoneNumber(phoneNumber);

        if (user || user != null) {
            this.logAndThrowError(new UserAlreadyExistsError(), `[UserService] ensureUserExists -> ${phoneNumber}`);
        }
    }

    private async ensureUserExists(phoneNumber: number): Promise<void> {
        const user = await this.getUserByPhoneNumber(phoneNumber);

        if (!user || user == null) {
            this.logAndThrowError(new UserNotFoundError(), `[UserService] ensureUserExists -> ${phoneNumber}`);
        }
    }

    public async validateArrayOfUsers(users: Array<number>): Promise<void> {
        const usersPromises = users.map(async user => {
            const usr = await this.getUserByIdPk(user);

            if (!usr) {
                this.logAndThrowError(new UserNotFoundError(), `[UserService] validateArrayOfUsers -> ${user}`);
            }

        });

        await Promise.all(usersPromises);
    }

    private async createEntityFromPersistance(user: User): Promise<UserEntity> {
        return await UserEntity.fromUseCase({
            name: user.name,
            surname: user.surname,
            type: user.type,
            login: user.login,
            user_id: user.user_id,
            status: user.status,
            phone_number: user.phone_number,
            password: user.password,
            created_at: user.created_at,
            updated_at: user?.updated_at,
            deleted_at: user?.deleted_at,
            id: user.id,
            reset_password_expires: user?.reset_password_expires,
            reset_password_token: user?.reset_password_token
        });
    }

    private logAndThrowError(error: CustomError, context: string): void {
        console.error(`${context}: ${error.message}`);
        throw error;
    }

}