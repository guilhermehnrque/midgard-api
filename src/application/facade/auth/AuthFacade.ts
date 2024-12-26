import { ForgotPasswordRequest } from "../../../infrastructure/requests/auth/ForgotPasswordRequest";
import { LoginRequest } from "../../../infrastructure/requests/auth/LoginRequest";
import { RegisterRequest } from "../../../infrastructure/requests/auth/RegisterRequest";
import { ResetPasswordRequest } from "../../../infrastructure/requests/auth/ResetPasswordRequest";
import { CreateUserDTO } from "../../dto/common/CreateUserDTO";
import { ForgotPasswordUseCase } from "../../usecases/auth/ForgotPasswordUseCase";
import { LoginUserUseCase } from "../../usecases/auth/LoginUserUseCase";
import { LogoutUseCase } from "../../usecases/auth/LogoutUseCase";
import { ProfileUseCase } from "../../usecases/auth/ProfileUseCase";
import { RegisterUserUseCase } from "../../usecases/auth/RegisterUserUseCase";
import { ResetPasswordUseCase } from "../../usecases/auth/ResetPasswordUseCase";
import { ValidateTokenUseCase } from "../../usecases/auth/ValidateTokenUseCase";

export class AuthFacade {

    private readonly loginUserUseCase = new LoginUserUseCase();
    private readonly registerUserUseCase = new RegisterUserUseCase();
    private readonly forgotPasswordUseCase = new ForgotPasswordUseCase();
    private readonly resetPasswordUseCase = new ResetPasswordUseCase();
    private readonly logoutUseCase = new LogoutUseCase();
    private readonly profileUseCase = new ProfileUseCase();
    private readonly validateTokenUseCase = new ValidateTokenUseCase();


    public async registerUser(request: RegisterRequest): Promise<void> {
        const { name, surname, email, type, login, password, phoneNumber } = request;
        const createUserDTO = new CreateUserDTO(name, surname, email, type, phoneNumber, login, password);

        await this.registerUserUseCase.execute(createUserDTO);
    }

    public async login(request: LoginRequest): Promise<string> {
        const { login, password } = request;
        return this.loginUserUseCase.execute(login, password);
    }

    public async forgotPassword(request: ForgotPasswordRequest) {
        const { login } = request;
        return this.forgotPasswordUseCase.execute(login);
    }

    public async resetPassword(request: ResetPasswordRequest, token: string) {
        const { password } = request;
        return this.resetPasswordUseCase.execute(password, token);
    }

    public async logout(userIdPk: number) {
        await this.logoutUseCase.execute(userIdPk);
    }

    public async profile(userIdPk: number): Promise<string> {
        return await this.profileUseCase.execute(userIdPk);
    }

    public async validateToken(token: string | undefined): Promise<boolean> {
        return await this.validateTokenUseCase.execute(token);
    }

}