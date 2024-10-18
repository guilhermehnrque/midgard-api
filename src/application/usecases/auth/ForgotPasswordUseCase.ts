import crypto from 'crypto';
import { UserEntity } from '../../../domain/entity/UserEntity';
import { UserService } from '../../services/UserService';
import { LoginError } from '../../erros/LoginError';

export class ForgotPasswordUseCase {

    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async execute(phoneNumber: number): Promise<void> {
        const user = await this.validateUserPhoneNumberAndReturnUser(phoneNumber);

        const { token, expiration } = await this.prepareTokens();

        await this.updateUser(user, token, expiration);
    }

    private async validateUserPhoneNumberAndReturnUser(phoneNumber: number): Promise<UserEntity> {
        const user = await this.userService.getUserByPhone(phoneNumber);

        if (user == null) {
            console.error(`User not found: ${phoneNumber}`);
            throw new LoginError();
        }

        return user;
    }

    private async prepareTokens() {
        const token = crypto.randomBytes(8).toString('hex');
        
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        console.log(`Token -> ${token}`);

        return { token, expiration };
    }

    private async updateUser(user: UserEntity, token: string, expiration: Date): Promise<void> {
        user.reset_password_token = token;
        user.reset_password_expires = expiration;

        await this.userService.updateUser(user);
    }

    async stepSendEmail(email: string, token: string): Promise<void> {
        return ;
    }

    async sendSMS(phoneNumber: number, token: string): Promise<void> {
        return ;
    }
}