import { UserEntity } from "../../domain/entity/UserEntity";
import { User } from "../../domain/models/UserModel";
import { UserRepositoryImpl } from "../../infrastructure/repositories/UserRepositoryImpl";
import { UserTypes } from "../enums/UserTypes";
import { CustomError } from "../erros/CustomError";
import { InvalidUserTypeError } from "../erros/InvalidUserTypeError";
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

    public async ensureUserIsOrganizer(user: UserEntity): Promise<void> {
        if (!user || user.type != UserTypes.ORGANIZER.toString()) {
            this.logAndThrowError(new InvalidUserTypeError('Usuário não permitido para executar essa operação', 401),
                `[UserService] getUserByIdPk ->  ${user.type}`);
        }
    }

    public async validateUserPassword(password: string, hash: string, login: string): Promise<void> {
        const isValid = await this.jwtService.checkPassword(password, hash);

        if (!isValid) {
            this.logAndThrowError(new LoginError(), `[UserService] validateUserPassword -> ${login}`);
        }

    }

    
    public async validateArrayOfUsers(users: Array<number>): Promise<void> {
        if (users.length === 0) {
            this.logAndThrowError(new UserNotFoundError(), '[UserService] validateArrayOfUsers -> Empty array');
        }

        const usersPromises = users.map(async user => {
            const usr = await this.getUserByIdPk(user);

            if (!usr) {
                this.logAndThrowError(new UserNotFoundError(), `[UserService] validateArrayOfUsers -> User not found ${user}`);
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