import { Request, Response, NextFunction } from 'express';
import { UserTypeAccessService } from '../../application/services/validation/UserTypeAccessService';
import { UserTypeVO } from '../../application/valueobjects/UserTypeVO';

declare module 'express-serve-static-core' {
    interface Request {
        userId?: string;
        userIdPk?: number;
    }
}

export default class UserTypeMiddleware {

    static async validate(request: Request, response: Response, next: NextFunction) {
        const { userId } = request;
        const userType = UserTypeVO.getPlayerType();
        const userAccess = new UserTypeAccessService();

        try {
            const userIdPk = await userAccess.validateAccessAndGetUserId(userId!, userType);
            request.userIdPk = userIdPk;
            next();
        } catch (error) {
            const { message } = error as Error;
            return response.status(401).json({ message });
        }
    }
}
