import { Router, Request, Response } from 'express';
import { schemas, handleValidationErrors } from '../../middlewares/validators/organizer/LocalValidator';
import { LocalController } from '../../controllers/organizer/LocalController';

export class LocalRouter {
    public readonly router: Router;
    private readonly localController: LocalController;
    constructor() {
        this.router = Router();
        this.localController = new LocalController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/create', [...schemas.register, handleValidationErrors.handle], (req: Request, res: Response) =>
            this.localController.createLocal(req, res)
        );

        this.router.put('/:localId/update', [...schemas.update, handleValidationErrors.handle], (req: Request, res: Response) =>
            this.localController.updateLocal(req, res)
        );

        this.router.get('/group/:groupId', [...schemas.getLocals, handleValidationErrors.handle], (req: Request, res: Response) =>
            this.localController.getLocals(req, res)
        );

        this.router.get('/:localId/details', [...schemas.detail, handleValidationErrors.handle], (req: Request, res: Response) =>
            this.localController.getLocal(req, res)
        );
    }
}

export default LocalRouter;
