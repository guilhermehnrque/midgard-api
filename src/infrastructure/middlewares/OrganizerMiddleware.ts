import { Request, Response, NextFunction } from 'express';
import { UserTypeAccessService } from '../../application/services/validation/UserTypeAccessService';
import { UserTypeVO } from '../../application/valueobjects/UserTypeVO';

export default class UserTypeMiddleware {
    
    static async validate(request: Request, response: Response, next: NextFunction) {
        const { userId } = request;
        const userType = UserTypeVO.getOrganizerType();
        const userAccess = new UserTypeAccessService();
        
        if (!userId) {
            console.error('[OrganizerMiddleware] User ID not provided');
            return response.status(500).json({ message: 'Internal server error' });
        }

        try {
            const userIdPk = await userAccess.validateAccessAndGetUserId(userId, userType);
            request.userIdPk = userIdPk;
            next();
        } catch (error) {
            const { message } = error as Error;
            return response.status(401).json({ message });
        }
    }
}
