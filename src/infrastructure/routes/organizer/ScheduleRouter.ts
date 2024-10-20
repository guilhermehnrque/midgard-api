import { Router, Request, Response } from "express";
import { ScheduleController } from "../../controllers/organizer/ScheduleController";
import { schemas } from "../../middlewares/validators/organizer/SchedulesValidator";
import ValidationErrorHandler from "../../middlewares/validators/ValidatorHandler";

export class ScheduleRouter {

    public readonly router: Router;
    private readonly schedulesController: ScheduleController;
    constructor() {
        this.router = Router();
        this.schedulesController = new ScheduleController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('', [...schemas.register, ValidationErrorHandler.handle], (req: Request, res: Response) =>
            this.schedulesController.createSchedule(req, res)
        );
        this.router.get('/:groupId', [...schemas.getSchedules, ValidationErrorHandler.handle], (req: Request, res: Response) =>
            this.schedulesController.getSchedules(req, res)
        );
        this.router.get('/:scheduleId/group-id/:groupId', [...schemas.detail, ValidationErrorHandler.handle], (req: Request, res: Response) =>
            this.schedulesController.getSchedule(req, res)
        );
        this.router.put('/:scheduleId', [...schemas.update, ValidationErrorHandler.handle], (req: Request, res: Response) =>
            this.schedulesController.updateSchedule(req, res)
        );
    }
}
