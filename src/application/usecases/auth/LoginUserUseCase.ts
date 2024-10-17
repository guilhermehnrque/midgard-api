import { UserEntity } from "../../../domain/entity/UserEntity";
import { LoginError } from "../../erros/LoginError";
import { JwtService } from "../../services/JwtService";
import { UserService } from "../../services/UserService";

export class LoginUserUseCase {

    private jwtService: JwtService
    private userService: UserService

    constructor() {
        this.jwtService = new JwtService();
        this.userService = new UserService();
    }

    async execute(login: string, password: string): Promise<string> {
        const user = await this.validateUserLoginAndReturnUser(login);
        await this.validateUserPassword(password, user.password!);

        const latestToken = await this.retriveLatestToken(user);

        return latestToken?.toString() ?? await this.createTokenAndGetNewToken(user);
    }

    private async validateUserLoginAndReturnUser(login: string): Promise<UserEntity> {
        const user = await this.userService.getUserByLogin(login);

        if (user == null) {
            console.error(`User not found: ${login}`);
            throw new LoginError();
        }

        return user;
    }

    private async validateUserPassword(password: string, hash: string): Promise<void> {
        const isValid = await this.jwtService.checkPassword(password, hash);

        if (!isValid) {
            console.error(`Invalid password`);
            throw new LoginError();
        }
    }

    private async retriveLatestToken(user: UserEntity): Promise<string | null> {
        const latestToken = await this.jwtService.getLatestValidToken(user);
        return latestToken;
    }

    private async createTokenAndGetNewToken(user: UserEntity): Promise<string> {
        await this.jwtService.expireLatestToken(user.id!);
        const token = await this.jwtService.createToken(user);
        await this.jwtService.saveToken(user.id!, token);

        return token.toString();
    }

}