import { UserService } from '../../services/UserService';
import { JwtService } from '../../services/JwtService';
import { UserEntity } from '../../../domain/entity/UserEntity';
import { LoginError } from '../../erros/LoginError';
import { HashPassword } from '../../utils/HashPassword';

export class ResetPasswordUseCase {

    private userService: UserService;
    private jwtService: JwtService;

    constructor() {
        this.userService = new UserService();
        this.jwtService = new JwtService();
    }

    async execute(password: string, token: string): Promise<void> {
        const user = await this.validateUserTokenAndReturnUser(token);

        const hashPassword = await HashPassword.hashPassword(password);
        user.setPassword(hashPassword);
        user.cleanTokens();

        const newToken = await this.jwtService.createToken(user);

        await this.userService.updateUser(user);

        await this.jwtService.expireLatestToken(user.id!);

        await this.jwtService.saveToken(user.id!, newToken);
    }

    private async validateUserTokenAndReturnUser(userToken: string): Promise<UserEntity> {
        const user =  await this.userService.getUserByResetToken(userToken);

        if (!user || user == null) {
            throw new LoginError('Reset token not found or expired');
        }

        return user;
    }

}