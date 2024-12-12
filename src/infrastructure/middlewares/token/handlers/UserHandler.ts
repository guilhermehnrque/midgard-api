import { UserService } from "../../../../application/services/UserService";
import { AbstractTokenHandler } from "../AbstractTokenHandler";
import { TokenContextDomain } from "../domain/TokenContextDomain";

export class UserHandler extends AbstractTokenHandler {

    private readonly userService = new UserService();

    constructor() {
        super();
    }

    public async handle(context: TokenContextDomain): Promise<TokenContextDomain | null> {
        const user = await this.userService.getUserByUserId(context.userId!);
        context.userIdPk = user.getUserIdPk();

        return context;
    }

}