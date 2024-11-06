import { ForgotPasswordRequest } from "../../../infrastructure/requests/auth/ForgotPasswordRequest";
import { LoginRequest } from "../../../infrastructure/requests/auth/LoginRequest";
import { RegisterRequest } from "../../../infrastructure/requests/auth/RegisterRequest";
import { ResetPasswordRequest } from "../../../infrastructure/requests/auth/ResetPasswordRequest";
import { CreateUserDTO } from "../../dto/common/CreateUserDTO";
import { ForgotPasswordUseCase } from "../../usecases/auth/ForgotPasswordUseCase";
import { LoginUserUseCase } from "../../usecases/auth/LoginUserUseCase";
import { RegisterUserUseCase } from "../../usecases/auth/RegisterUserUseCase";
import { ResetPasswordUseCase } from "../../usecases/auth/ResetPasswordUseCase";

export class AuthFacade {

    private readonly loginUserUseCase: LoginUserUseCase;
    private readonly registerUserUseCase: RegisterUserUseCase;
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase;
    private readonly resetPasswordUseCase: ResetPasswordUseCase;

    constructor() {
        this.loginUserUseCase = new LoginUserUseCase();
        this.registerUserUseCase = new RegisterUserUseCase();
        this.forgotPasswordUseCase = new ForgotPasswordUseCase();
        this.resetPasswordUseCase = new ResetPasswordUseCase();
    }

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
        const { phoneNumber } = request;
        return this.forgotPasswordUseCase.execute(parseInt(phoneNumber!));
    }

    public async resetPassword(request: ResetPasswordRequest, token: string) {
        const { password } = request;
        return this.resetPasswordUseCase.execute(password, token);
    }

}