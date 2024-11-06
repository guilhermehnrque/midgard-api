import { JwtService } from "../../services/JwtService";
import { UserService } from "../../services/UserService";

export class LogoutUseCase {

    private readonly jwtService: JwtService;
    private readonly userService: UserService;

    constructor(){
        this.jwtService = new JwtService();
        this.userService = new UserService();
    }

    public async execute(): Promise<void> {
        return;
    }
}
