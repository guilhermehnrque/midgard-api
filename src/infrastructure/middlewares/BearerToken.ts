import { JwtUtils } from '../../application/utils/JwtUtils';
import { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { DecodedTokenInterface } from './interfaces/DecodedTokenInterface';

declare module 'express-serve-static-core' {
    interface Request {
        userId?: string;
        userIdPk?: number;
    }
}

export default class BearerToken {
    static async validate(request: Request, response: Response, next: NextFunction) {
        const token = BearerToken.getTokenFromHeader(request);

        if (!token) {
            return BearerToken.handleUnauthorized(response, 'Token not provided');
        }

        const decoded = await JwtUtils.verifyToken(token) as DecodedTokenInterface;

        if (!decoded) {
            return BearerToken.handleUnauthorized(response, 'Invalid token');
        }

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
