import { JwtTokenEntity } from "../entity/JwtTokenEntity";
import { JwtToken } from "../models/JwtTokenModel";

export interface JwtTokensRepositoryInterface {
    createToken(jwtTokenEntity: JwtTokenEntity): Promise<JwtToken>;
    updateToken(token: JwtTokenEntity): Promise<number>;
    getByToken(token: string): Promise<JwtToken | null>;
    getLatestValidToken(userIdPk: number): Promise<JwtToken | null>;
}