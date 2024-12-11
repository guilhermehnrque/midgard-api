import { Router, Request, Response } from 'express';
import { schemas, handleValidationErrors } from '../../middlewares/validators/organizer/ListValidator';
import { ListController } from '../../controllers/organizer/ListController';
import { OrganizerHandler } from '../../middlewares/access/organizer/OrganizerHandler';

export class ListRouter {

    public readonly router: Router;
    private readonly listController: ListController;
    private readonly accessHandler: OrganizerHandler;

    constructor() {
        this.router = Router();
        this.listController = new ListController();
        this.accessHandler = new OrganizerHandler();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/create', [...schemas.register, handleValidationErrors.handle, this.accessHandler.groupAccess.bind(this.accessHandler)], (req: Request, res: Response) =>
            this.listController.createList(req, res)
        );

        this.router.get('/group/:groupId', [...schemas.get, handleValidationErrors.handle, this.accessHandler.groupAccess.bind(this.accessHandler)], (req: Request, res: Response) =>
            this.listController.getLists(req, res)
        );

        this.router.get('/:listId/details', [...schemas.details, handleValidationErrors.handle, this.accessHandler.listAccess.bind(this.accessHandler)], (req: Request, res: Response) =>
            this.listController.getList(req, res)
        );

        this.router.put('/:listId/update', [...schemas.update, handleValidationErrors.handle, this.accessHandler.listAccess.bind(this.accessHandler)], (req: Request, res: Response) =>
            this.listController.updateList(req, res)
        );
    }
}

export default ListRouter;
