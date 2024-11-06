import { JwtService } from "../../services/JwtService";
import { UserService } from "../../services/UserService";

export class LogoutUseCase {

    private readonly jwtService: JwtService;
    private readonly userService: UserService;

    constructor(){
        this.jwtService = new JwtService();
        this.userService = new UserService();
    }

    public async execute(userId: string): Promise<void> {
        const user = await this.userService.getUserByUserId(userId);

        await this.jwtService.expireLatestToken(user.id!);
    }
}
