import { UserEntity } from "../../../domain/entity/UserEntity";
import { LoginError } from "../../erros/LoginError";
import { JwtService } from "../../services/JwtService";
import { UserService } from "../../services/UserService";

export class LogoutUseCase {

    private readonly jwtService: JwtService;
    private readonly userService: UserService;

    constructor(){
        this.jwtService = new JwtService();
        this.userService = new UserService();
    }

    public async execute(userIdPk: number): Promise<void> {
        const user = await this.userService.getUserByIdPk(userIdPk);

        await this.checkUser(user);

        await this.jwtService.expireAllUserTokens(user.getUserIdPk());
    }

    private async checkUser(user: UserEntity | null): Promise<void> {
        if (user == null) {
            throw new LoginError();
        }
    }

}
