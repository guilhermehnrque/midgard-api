import { CustomError } from "../../../../application/erros/CustomError";
import { JwtUtils } from "../../../../application/utils/JwtUtils";
import { DecodedTokenInterface } from "../../interfaces/DecodedTokenInterface";
import { AbstractTokenHandler } from "../AbstractTokenHandler";
import { TokenContextDomain } from "../domain/TokenContextDomain";

export class VerifyDecodedTokenHandler extends AbstractTokenHandler {

   constructor() {
      super();
   }

   async handle(context: TokenContextDomain): Promise<any> {
      const decoded = await JwtUtils.verifyToken(context.token!) as DecodedTokenInterface;

      if (!decoded) {
         throw new CustomError('Invalid token', 401);
      }

      context.userId = decoded.userId;

      return super.handle(context);
   }

}
