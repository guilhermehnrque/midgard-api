import { JwtTokenEntity } from "../entity/JwtTokenEntity";
import { JwtToken } from "../models/JwtTokenModel";

export interface JwtTokensRepositoryInterface {
    saveToken(jwtTokenEntity: JwtTokenEntity): Promise<JwtToken>;
    getByToken(token: string): Promise<JwtToken | null>;
    getLatestValidToken(userIdPk: number): Promise<JwtToken | null>;
    expireLatestToken(userIdPk: number): Promise<void>;
}