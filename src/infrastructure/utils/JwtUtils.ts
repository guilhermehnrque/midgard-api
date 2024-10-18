import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const secretKey = process.env.PROJECT_GDB_SECRET_KEY;
const DAYS_TO_EXPIRE_AS_HOUR = process.env.DAYS_TO_EXPIRE_IN_HOUR;

export default class JwtUtils {

    static async generateToken(payload: any) {
        const secrets = {
            userId: payload.user_id,
            type: payload.type
        }

        return jwt.sign(secrets, secretKey!, { expiresIn: DAYS_TO_EXPIRE_AS_HOUR! })
    }

    static async verifyToken(token: string): Promise<jwt.JwtPayload | boolean> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secretKey as Secret, (err, decoded) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(decoded as JwtPayload);
                }
            });
        });
    }
}
