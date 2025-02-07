import { Router, Request, Response } from "express";
import { ScheduleController } from "../../controllers/organizer/ScheduleController";
import { schemas } from "../../middlewares/validators/organizer/SchedulesValidator";
import ValidationErrorHandler from "../../middlewares/validators/ValidatorHandler";
import { OrganizerHandler } from "../../middlewares/access/organizer/OrganizerHandler";

export class ScheduleRouter {

    public readonly router: Router;
    private readonly schedulesController: ScheduleController;
    private readonly accessHandler: OrganizerHandler;

    constructor() {
        this.router = Router();
        this.schedulesController = new ScheduleController();
        this.accessHandler = new OrganizerHandler();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/create', [...schemas.register, ValidationErrorHandler.handle, this.accessHandler.groupAccess.bind(this.accessHandler)],
            (req: Request, res: Response) =>
                this.schedulesController.createSchedule(req, res)
        );

        this.router.get('/group/:groupId', [...schemas.getSchedules, ValidationErrorHandler.handle, this.accessHandler.groupAccess.bind(this.accessHandler)],
            (req: Request, res: Response) =>
                this.schedulesController.getSchedules(req, res)
        );

        this.router.get('/:scheduleId/details', [...schemas.detail, ValidationErrorHandler.handle, this.accessHandler.scheduleAccess.bind(this.accessHandler)],
            (req: Request, res: Response) =>
                this.schedulesController.getSchedule(req, res)
        );

        this.router.put('/:scheduleId/update', [...schemas.update, ValidationErrorHandler.handle, this.accessHandler.scheduleAccess.bind(this.accessHandler)],
            (req: Request, res: Response) =>
                this.schedulesController.updateSchedule(req, res)
        );
    }
}
