import { UserService } from '../../services/UserService';
import { JwtService } from '../../services/JwtService';
import { UserEntity } from '../../../domain/entity/UserEntity';
import { LoginError } from '../../erros/LoginError';
import { HashPassword } from '../../utils/HashPassword';

export class ResetPasswordUseCase {

    private readonly userService: UserService;
    private readonly jwtService: JwtService;

    constructor() {
        this.userService = new UserService();
        this.jwtService = new JwtService();
    }

    async execute(password: string, token: string): Promise<void> {
        const user = await this.userService.getUserByResetToken(token);
        await this.checkUser(user);

        const hashedPassword = await HashPassword.hashPassword(password);
        user!.setPassword(hashedPassword);
        user!.cleanTokens();

        await this.userService.updateUser(user!);
        await this.jwtService.expireAllUserTokens(user!.getUserIdPk());
    }

    private async checkUser(userEntity: UserEntity | null): Promise<void> {
        if (userEntity == null) {
            throw new LoginError('Reset token not found or expired');
        }
    }

}