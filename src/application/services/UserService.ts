import { UserEntity } from "../../domain/entity/UserEntity";
import { User } from "../../domain/models/UserModel";
import { UserRepositoryImpl } from "../../infrastructure/repositories/UserRepositoryImpl";
import { CustomError } from "../erros/CustomError";
import { InternalError } from "../erros/InternalError";
import { LoginError } from "../erros/LoginError";
import { UserAlreadyExistsError } from "../erros/UserAlreadyExistsError";
import { UserNotFoundError } from "../erros/UserNotFoundError";
import { JwtService } from "./JwtService";

export class UserService {

    private readonly userRepository: UserRepositoryImpl;
    private readonly jwtService: JwtService;

    constructor() {
        this.userRepository = new UserRepositoryImpl();
        this.jwtService = new JwtService();
    }

    async createUser(user: UserEntity): Promise<void> {
        try {
            await this.userRepository.createUser(user);
        } catch (error) {
            const customError = error as CustomError;
            this.logAndThrowError(new InternalError(), `[UserService] createUser -> ${customError.message}`);
        }
    }

    async updateUser(user: UserEntity): Promise<number> {
        try {
            return await this.userRepository.updateUser(user);
        } catch (error) {
            const customError = error as CustomError;
            this.logAndThrowError(new InternalError(), `[UserService] updateUser -> ${customError.message}`);
            return 0;
        }
    } 

    async getUserByPhone(phone: number): Promise<UserEntity> {
        const user = await this.userRepository.getUserByPhone(phone);

        if (!user) {
            this.logAndThrowError(new UserNotFoundError(), `[UserService] getUserByLogin -> ${phone}`);
        }

        return await this.createEntityFromPersistance(user!);
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

    public async ensureUserExists(login: string, phoneNumber: number): Promise<void> {
        const user = await this.userRepository.getUserByPhone(phoneNumber);

        if (user || user != null) {
            this.logAndThrowError(new UserAlreadyExistsError(), `[UserService] ensureUserExists -> ${login}`);
        }
    }


    public async validateUserPassword(password: string, hash: string, login: string): Promise<void> {
        const isValid = await this.jwtService.checkPassword(password, hash);

        if (!isValid) {
            this.logAndThrowError(new LoginError(), `[UserService] validateUserPassword -> ${login}`);
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
            user_id: user.user_id,
            status: user.status,
            phone_number: user.phone_number,
            login: user.login,
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