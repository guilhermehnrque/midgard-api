import { CustomError } from "../../../../application/erros/CustomError";
import { JwtService } from "../../../../application/services/JwtService";
import { AbstractTokenHandler } from "../AbstractTokenHandler";
import { TokenContextDomain } from "../domain/TokenContextDomain";

export class CheckRevokedTokenHandler extends AbstractTokenHandler {

    private readonly jwtService = new JwtService();

    constructor() {
        super();
    }

    async handle(context: TokenContextDomain): Promise<any> {
        const tokenEntity = await this.jwtService.getTokenByTokenString(context.token!);

        if (tokenEntity!.isRevoked()) {
            throw new CustomError('Token revoked', 401);
        }

        return super.handle(context);
    }

}
