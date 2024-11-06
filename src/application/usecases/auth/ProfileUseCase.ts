import { UserService } from "../../services/UserService";

export class ProfileUseCase {

    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async execute(userId: string): Promise<string> {
        const user = await this.userService.getUserByUserId(userId);

        return user.getUserType();
    }

}
