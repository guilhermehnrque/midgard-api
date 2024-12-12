import { UserEntity } from "../../../domain/entity/UserEntity";
import { LoginError } from "../../erros/LoginError";
import { UserNotFoundError } from "../../erros/UserNotFoundError";
import { JwtService } from "../../services/JwtService";
import { UserService } from "../../services/UserService";

export class LoginUserUseCase {

    private readonly jwtService: JwtService
    private readonly userService: UserService

    constructor() {
        this.jwtService = new JwtService();
        this.userService = new UserService();
    }

    public async execute(login: string, password: string): Promise<string> {
        const user = await this.userService.getUserByLogin(login);
        await this.checkUser(user);
        await this.checkPassword(password, user!.getPassword());

        return await this.tokenManagement(user!);
    }

    private async checkUser(user: UserEntity | null): Promise<void> {
        if(user == null) {
            throw new UserNotFoundError();
        }
    }

    private async checkPassword(password: string, hash: string): Promise<void> {
        const isValid = await this.jwtService.checkPassword(password, hash);
    
        if (!isValid) {
            throw new LoginError();
        }
    }

    private async tokenManagement(user: UserEntity): Promise<string> {
        const latestToken = await this.jwtService.getLatestValidToken(user);
    
        if (latestToken?.isValid()) {
            return latestToken.getToken();
        }
    
        return await this.tokeGenerateManagement(user);
    }

    private async tokeGenerateManagement(userEntity: UserEntity): Promise<string> {
        await this.jwtService.expireAllUserTokens(userEntity.getUserIdPk());
        const token = await this.jwtService.createToken(userEntity);

        await this.jwtService.saveToken(userEntity.getUserIdPk(), token);
        
        return token;
    }

}