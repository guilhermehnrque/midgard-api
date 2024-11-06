import { Router, Request, Response } from "express";
import { GroupController } from "../../controllers/organizer/GroupController";
import { schemas } from "../../middlewares/validators/organizer/GroupValidator";
import ValidationErrorHandler from "../../middlewares/validators/ValidatorHandler";
import { OrganizerHandler } from "../../middlewares/access/OrganizerHandler";

export class GroupRouter {

    public readonly router: Router;
    private readonly groupController: GroupController;
    private readonly accessHandler: OrganizerHandler;

    constructor() {
        this.router = Router();
        this.groupController = new GroupController();
        this.accessHandler = new OrganizerHandler();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('', (req: Request, res: Response) =>
            this.groupController.getGroups(req, res)
        );

        this.router.post('/create', [...schemas.register, ValidationErrorHandler.handle], (req: Request, res: Response) =>
            this.groupController.createGroup(req, res)
        );

        this.router.get('/:groupId/details', [...schemas.detail, ValidationErrorHandler.handle, this.accessHandler.groupAccess.bind(this.accessHandler)], (req: Request, res: Response) =>
            this.groupController.getGroup(req, res)
        );

        this.router.put('/:groupId/update', [...schemas.update, ValidationErrorHandler.handle, this.accessHandler.groupAccess.bind(this.accessHandler)], (req: Request, res: Response) =>
            this.groupController.updateGroup(req, res)
        );
    }
}
