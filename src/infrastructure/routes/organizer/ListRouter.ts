import { Router, Request, Response } from 'express';
import { schemas, handleValidationErrors } from '../../middlewares/validators/organizer/ListValidator';
import { ListController } from '../../controllers/organizer/ListController';

export class ListRouter {

    public readonly router: Router;
    private readonly listController: ListController;
    
    constructor() {
        this.router = Router();
        this.listController = new ListController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/', [...schemas.register, handleValidationErrors.handle], (req: Request, res: Response) => 
            this.listController.createList(req, res)
        );

        this.router.get('/:groupId', [...schemas.get, handleValidationErrors.handle], (req: Request, res: Response) => 
            this.listController.getLists(req, res)
        );

        this.router.get('/:listId/group-id/:groupId', [...schemas.details, handleValidationErrors.handle], (req: Request, res: Response) => 
            this.listController.getList(req, res)
        );

        this.router.put('/:listId', [...schemas.update, handleValidationErrors.handle], (req: Request, res: Response) => 
            this.listController.updateList(req, res)
        );
    }
}

export default ListRouter;
