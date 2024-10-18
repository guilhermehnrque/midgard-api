import { Router, Request, Response } from 'express';
import { AuthController } from '../../controllers/auth/AuthController';
import { schemas, handleValidationErrors } from '../../middlewares/validators/auth/AuthValidator';

const router = Router();

const authController = new AuthController();

router.post('/', [...schemas.register, handleValidationErrors], (request: Request, response: Response) => authController.createUser(request, response));
router.post('/login', [...schemas.login, handleValidationErrors], (request: Request, response: Response) => authController.loginUser(request, response));
router.post('/forgot-password', [...schemas.forgotPassword, handleValidationErrors], (request: Request, response: Response) => authController.forgotPassword(request, response));
router.post('/reset-password/:token', [...schemas.resetPassword, handleValidationErrors], (request: Request, response: Response) => authController.resetPassword(request, response));

export default router;
