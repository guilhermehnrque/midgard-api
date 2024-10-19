import { Request, Response } from "express";

import { CustomError } from "../../../application/erros/CustomError";
import { AuthFacade } from "../../../application/facade/auth/AuthFacade";
import { RegisterRequest } from "../../requests/auth/RegisterRequest";
import { LoginRequest } from "../../requests/auth/LoginRequest";
import { ForgotPasswordRequest } from "../../requests/auth/ForgotPasswordRequest";
import { ResetPasswordRequest } from "../../requests/auth/ResetPasswordRequest";

export class AuthController {

    private readonly authFacade: AuthFacade;

    constructor() {
        this.authFacade = new AuthFacade();
    }

    public async createUser(request: Request, response: Response): Promise<Response> {
        try {
            const registerRequest = request.body as RegisterRequest;

            await this.authFacade.registerUser(registerRequest);

            return response.status(201).json();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async loginUser(request: Request, response: Response): Promise<Response> {
        try {
            const loginRequest =  request.body as LoginRequest;
            const token = await this.authFacade.login(loginRequest);

            return response.status(200).json({ token });
        } catch (error) {
            console.error(error)
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async forgotPassword(request: Request, response: Response): Promise<Response> {
        try {
            const forgotPasswordRequest = request.body as ForgotPasswordRequest
            await this.authFacade.forgotPassword(forgotPasswordRequest);

            return response.status(200).json({ message: "Solicitação de reset foi efetuada" });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async resetPassword(request: Request, response: Response): Promise<Response> {
        try {
            const resetPasswordRequest = request.body as ResetPasswordRequest;
            const { token } = request.params;

            await this.authFacade.resetPassword(resetPasswordRequest, token);
            return response.status(200).json({ message: "Senha resetada" });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

}
