import { Router, Request, Response } from 'express';
import { AuthController } from '../../controllers/auth/AuthController';
import { schemas, handleValidationErrors } from '../../middlewares/validators/auth/AuthValidator';
import BearerToken from '../../middlewares/BearerToken';

export class AuthRouter {
    public readonly router: Router;
    private readonly authController: AuthController;

    constructor() {
        this.router = Router();
        this.authController = new AuthController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/register', schemas.register, handleValidationErrors.handle, (request: Request, response: Response) => 
            this.authController.createUser(request, response)
        );

        this.router.post('/login', [...schemas.login, handleValidationErrors.handle], (request: Request, response: Response) => 
            this.authController.loginUser(request, response)
        );

        this.router.post('/forgot-password', [...schemas.forgotPassword, handleValidationErrors.handle], (request: Request, response: Response) => 
            this.authController.forgotPassword(request, response)
        );

        this.router.post('/reset-password/:token', [...schemas.resetPassword, handleValidationErrors.handle], (request: Request, response: Response) => 
            this.authController.resetPassword(request, response)
        );

        this.router.post('/logout', [BearerToken.validate], (request: Request, response: Response) =>
            this.authController.logout(request, response)
        );

        this.router.get('/profile', [BearerToken.validate], (request: Request, response: Response) => 
            this.authController.getProfile(request, response)
        );
    }
}

export default AuthRouter;
