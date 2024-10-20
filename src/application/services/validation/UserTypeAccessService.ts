import { PermissionError } from "../../erros/PermissionError";
import { UserService } from "../UserService";

export class UserTypeAccessService {

    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async validateAccessAndGetUserId(userId: string, type: string): Promise<number> {
        const user = await this.userService.getUserByUserId(userId);

        if (type != user.getUserType()) {
            console.error(`[UserTypeAccessService] validateAccessAndGetUserId -> Access denied ${userId}`);
            throw new PermissionError();
        }

        return user.getUserIdPk();
    }

}