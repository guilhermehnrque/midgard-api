import { JwtTokenEntity } from "../../domain/entity/JwtTokenEntity";
import { HashPassword } from '../utils/HashPassword';
import { UserEntity } from "../../domain/entity/UserEntity";
import { JwtUtils } from '../utils/JwtUtils';
import { JwtTokensRepositoryImpl } from "../../infrastructure/repositories/JwtTokenRepositoryImpl";
import { JwtToken } from "../../domain/models/JwtTokenModel";

interface JSONConvertible {
    toJSON(): any;
}

export class JwtService {

    private readonly jwtRepository: JwtTokensRepositoryImpl;

    constructor() {
        this.jwtRepository = new JwtTokensRepositoryImpl();
    }

    async createToken<T extends JSONConvertible>(data: T): Promise<string> {
        const payload = data.toJSON();
        return await JwtUtils.generateToken(payload);
    }

    async saveToken(users_id: number, token: string): Promise<void> {
        const jwtEntity = await JwtTokenEntity.createFromPayload({
            users_id, token
        });

        await this.jwtRepository.createToken(jwtEntity);
    }

    async checkPassword(password: string, hash: string): Promise<boolean> {
        return await HashPassword.comparePassword(password, hash);
    }

    async expireLatestToken(userIdPk: number): Promise<void> {
        const token = await this.jwtRepository.getLatestValidToken(userIdPk);

        if (token) {
            const jwtEntity = await JwtTokenEntity.createFromPersistance(token);
            jwtEntity.revoked = true;
            jwtEntity.revoked_at = new Date();

            await this.jwtRepository.updateToken(jwtEntity);
        }
    }

    public async getLatestValidToken(userEntity: UserEntity): Promise<string | null> {
        const token = await this.jwtRepository.getLatestValidToken(userEntity.id!);

        if (!token) {
            return null;
        }

        return token.token;
    }

    public async getTokenByTokenString(token: string): Promise<JwtTokenEntity | null> {
        const repository = await this.jwtRepository.getByToken(token);

        if (repository == null) {
            return null;
        }

        return await this.fromPersistance(repository!);
    }

    private async fromPersistance(jwtToken: JwtToken) {
        return await JwtTokenEntity.createFromPersistance({
            id: jwtToken.id,
            users_id: jwtToken.users_id,
            token: jwtToken.token,
            expires_at: jwtToken.expires_at,
            revoked: jwtToken.revoked,
            revoked_at: jwtToken.revoked_at!,
            created_at: jwtToken.created_at,
            updated_at: jwtToken.updated_at,
        });
    }

}
