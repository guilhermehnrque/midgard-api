import { JwtTokenEntity } from "../../domain/entity/JwtTokenEntity";
import { JwtToken } from "../../domain/models/JwtTokenModel";
import { CustomError } from "../../application/erros/CustomError";
import { DatabaseError } from "../../application/erros/DatabaseError";
import { JwtTokensRepositoryInterface } from "../../domain/repositories/JwtTokenRepositoryInterface";

export class JwtTokensRepositoryImpl implements JwtTokensRepositoryInterface {

    async createToken(jwtTokenEntity: JwtTokenEntity): Promise<JwtToken> {
        try {
            return await JwtToken.create(jwtTokenEntity.registerPayload())
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[JwtTokensRepositoryImpl] createToken -> ${customError.message}`);
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

    public async updateToken(token: JwtTokenEntity): Promise<number> {
        try {
            const [affectedCount] = await JwtToken.update(token.updatePayload(),
                {
                    where: {
                        id: token.id!
                    }
                }
            );

            return affectedCount;
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[JwtTokensRepositoryImpl] updateToken -> ${customError.message}`);
        }
    }

    public async expireAllUserTokens(userIdPk: number): Promise<number>{
        try {
            const [affectedCount] = await JwtToken.update({ revoked: true, revoked_at: new Date() }, { where: { users_id: userIdPk} });
            return affectedCount;
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[JwtTokensRepositoryImpl] expireAllUserTokens -> ${customError.message}`);
        }
    }


}