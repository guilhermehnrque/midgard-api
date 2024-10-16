import { JwtTokenEntity } from "../../domain/entity/JwtTokenEntity";
import { JwtToken } from "../../domain/models/JwtTokenModel";
import { CustomError } from "../../application/erros/CustomError";
import { DatabaseError } from "../../application/erros/DatabaseError";
import { JwtTokensRepositoryInterface } from "../../domain/repositories/JwtTokenRepositoryInterface";

export class JwtTokensRepositoryImpl implements JwtTokensRepositoryInterface {

    async saveToken(jwtTokenEntity: JwtTokenEntity): Promise<JwtToken> {
        try {
            return await JwtToken.create(jwtTokenEntity.registerPayload())
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[JwtTokensRepositoryImpl] saveToken -> ${customError.message}`);
        }
    }

    async getByToken(token: string): Promise<JwtToken | null> {
        try {
            return await JwtToken.findOne({ where: { token } });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[JwtTokensRepositoryImpl] getByToken -> ${customError.message}`);
        }
    }

    async getLatestValidToken(userIdPk: number): Promise<JwtToken | null> {
        try {
            return await JwtToken.findOne({
                where: {
                    revoked: false,
                    users_id: userIdPk,
                    revoked_at: null
                },
                order: [
                    ['id', 'DESC']
                ]
            });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[JwtTokensRepositoryImpl] getLatestValidToken -> ${customError.message}`);
        }
    }

    // TODO: Migrar regra para service
    async expireLatestToken(userIdPk: number): Promise<void> {
        try {
            const latestToken = await JwtToken.findOne({
                where: {
                    revoked: false,
                    users_id: userIdPk,
                    revoked_at: null
                },
                order: [
                    ['id', 'DESC']
                ]
            });

            if (latestToken) {
                latestToken.revoked = true;
                latestToken.revoked_at = new Date();
                await latestToken.save();
            }
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[JwtTokensRepositoryImpl] expireLatestToken -> ${customError.message}`);
        }
    }

    
}