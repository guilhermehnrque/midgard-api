import { Router, Request, Response } from "express";
import { GroupOrganizerController } from "../../controllers/organizer/GroupOrganizerController";
import { OrganizerHandler } from "../../middlewares/access/organizer/OrganizerHandler";
import { requestValidations } from "../../middlewares/validators/organizer/GroupOrganizerValidator";
import ValidationErrorHandler from "../../middlewares/validators/ValidatorHandler";

export class GroupOrganizerRouter {
    public readonly router = Router();
    private readonly groupOrganizerController = new GroupOrganizerController();
    private readonly accessHandler = new OrganizerHandler();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/include", [this.accessHandler.groupAccess.bind(this.accessHandler), ...requestValidations, ValidationErrorHandler.handle],
        (req: Request, res: Response) =>
            this.groupOrganizerController.includeOrganizer(req, res)
        );

        this.router.post("/remove", [this.accessHandler.groupAccess.bind(this.accessHandler), ...requestValidations, ValidationErrorHandler.handle],
        (req: Request, res: Response) =>
            this.groupOrganizerController.removeOrganizer(req, res)
        );

    }
}