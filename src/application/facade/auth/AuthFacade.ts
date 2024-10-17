import { CreateUserDTO } from "../../dto/common/CreateUserDTO";
import { ForgotPasswordUseCase } from "../../usecases/auth/ForgotPasswordUseCase";
import { LoginUserUseCase } from "../../usecases/auth/LoginUserUseCase";
import { RegisterUserUseCase } from "../../usecases/auth/RegisterUserUseCase";
import { ResetPasswordUseCase } from "../../usecases/auth/ResetPasswordUseCase";

export class AuthFacade {

    private loginUserUseCase: LoginUserUseCase;
    private registerUserUseCase: RegisterUserUseCase;
    private forgotPasswordUseCase: ForgotPasswordUseCase;
    private resetPasswordUseCase: ResetPasswordUseCase;

    constructor() {
        this.loginUserUseCase = new LoginUserUseCase();
        this.registerUserUseCase = new RegisterUserUseCase();
        this.forgotPasswordUseCase = new ForgotPasswordUseCase();
        this.resetPasswordUseCase = new ResetPasswordUseCase();
    }

    public async registerUser(request: any): Promise<void> {
        const { name, surname, email, type, login, password, phoneNumber } = request;
        const createUserDTO = new CreateUserDTO(name, surname, email, type, phoneNumber, login, password);

        this.registerUserUseCase.execute(createUserDTO);
    }

    public async login(login: string, password: string): Promise<string> {
        return this.loginUserUseCase.execute(login, password);
    }

    public async forgotPassword(phoneNumber: string) {
        return this.forgotPasswordUseCase.execute(parseInt(phoneNumber));
    }

    public async resetPassword(password: string, token: string) {
        return this.resetPasswordUseCase.execute(password, token);
    }

}