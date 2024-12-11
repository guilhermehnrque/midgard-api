import { Router, Request, Response } from 'express';
import { schemas, handleValidationErrors } from '../../middlewares/validators/organizer/LocalValidator';
import { LocalController } from '../../controllers/organizer/LocalController';
import { OrganizerHandler } from '../../middlewares/access/organizer/OrganizerHandler';

export class LocalRouter {

    public readonly router: Router;
    private readonly localController: LocalController;
    private readonly accessHandler: OrganizerHandler;

    constructor() {
        this.router = Router();
        this.localController = new LocalController();
        this.accessHandler = new OrganizerHandler();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/create', [...schemas.register, handleValidationErrors.handle, this.accessHandler.groupAccess.bind(this.accessHandler)], (req: Request, res: Response) =>
            this.localController.createLocal(req, res)
        );

        this.router.put('/:localId/update', [...schemas.update, handleValidationErrors.handle, this.accessHandler.localAccess.bind(this.accessHandler)], (req: Request, res: Response) =>
            this.localController.updateLocal(req, res)
        );

        this.router.get('/group/:groupId', [...schemas.getLocals, handleValidationErrors.handle, this.accessHandler.groupAccess.bind(this.accessHandler)], (req: Request, res: Response) =>
            this.localController.getLocals(req, res)
        );

        this.router.get('/:localId/details', [...schemas.detail, handleValidationErrors.handle, this.accessHandler.localAccess.bind(this.accessHandler)], (req: Request, res: Response) =>
            this.localController.getLocal(req, res)
        );
    }
}

export default LocalRouter;
