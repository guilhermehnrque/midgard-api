import { CustomError } from "../../../../application/erros/CustomError";
import { UserService } from "../../../../application/services/UserService";
import { UserTypeVO } from "../../../../application/valueobjects/UserTypeVO";
import { AbstractTokenHandler } from "../AbstractTokenHandler";
import { TokenContextDomain } from "../domain/TokenContextDomain";

export class PlayerHandler extends AbstractTokenHandler {

    private readonly userService: UserService;

    constructor() {
        super();
        this.userService = new UserService();
    }

    async handle(context: TokenContextDomain): Promise<any> {
        const user = await this.userService.getUserByUserId(context.userId!);
        const validAccess = UserTypeVO.getPlayerAccessAuthorization().includes(user.getUserType());

        if (!validAccess) {
            throw new CustomError('Not authorized', 401);
        }

        return super.handle(context);
    }

}
