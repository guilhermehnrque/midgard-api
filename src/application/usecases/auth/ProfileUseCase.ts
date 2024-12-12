import { UserService } from "../../services/UserService";

export class ProfileUseCase {

    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async execute(userIdPk: number): Promise<string> {
        const user = await this.userService.getUserByIdPk(userIdPk);

        return user.getUserType();
    }

}
