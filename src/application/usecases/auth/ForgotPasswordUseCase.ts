import crypto from 'crypto';
import { UserEntity } from '../../../domain/entity/UserEntity';
import { UserService } from '../../services/UserService';
import { LoginError } from '../../erros/LoginError';

export class ForgotPasswordUseCase {

    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async execute(userLogin: string): Promise<void> {
        const user = await this.userService.getUserByLogin(userLogin);
        await this.checkUser(user);

        const { token, expiration } = await this.prepareExpirationTokens();

        await this.updateUser(user!, token, expiration);
    }

    private async checkUser(user: UserEntity | null): Promise<void> {
        if (user == null) {
            throw new LoginError();
        }
    }

    private async prepareExpirationTokens() {
        const token = crypto.randomBytes(8).toString('hex');
        
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        console.log(`Token -> ${token}`);

        return { token, expiration };
    }

    private async updateUser(user: UserEntity, token: string, expiration: Date): Promise<void> {
        user.setResetPasswordToken(token);
        user.setResetPasswordExpires(expiration);

        await this.userService.updateUser(user);
    }

    async stepSendEmail(email: string, token: string): Promise<void> {
        return ;
    }

    async sendSMS(phoneNumber: number, token: string): Promise<void> {
        return ;
    }
}