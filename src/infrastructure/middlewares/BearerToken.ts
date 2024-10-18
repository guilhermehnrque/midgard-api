import { JwtUtils } from '../../application/utils/JwtUtils';
import { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        userType?: string;
        userId?: string;
    }
}

interface DecodedToken {
    type: string;
    userId: string;
}

class BearerToken {
    static async validate(request: Request, response: Response, next: NextFunction) {
        const token = BearerToken.getTokenFromHeader(request);

        if (!token) {
            return BearerToken.handleUnauthorized(response, 'Token not provided');
        }

        const decoded = await JwtUtils.verifyToken(token) as DecodedToken;

        if (!decoded) {
            return BearerToken.handleUnauthorized(response, 'Invalid token');
        }

        request.userType = decoded.type;
        request.userId = decoded.userId;

        next();
    }

    static getTokenFromHeader(request: Request): string | undefined {
        return request.headers.authorization?.split(' ')[1];
    }

    static handleUnauthorized(response: Response, message: string) {
        return response.status(401).json({ message });
    }

    static async isTokenValid(token: string): Promise<JwtPayload | boolean> {
        return await JwtUtils.verifyToken(token);
    }
}

export default BearerToken;