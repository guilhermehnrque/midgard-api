
import { Router, Request, Response } from 'express';
import { ScheduleController } from '../../controllers/organizer/ScheduleController';
import { schemas, handleValidationErrors } from '../../middlewares/validators/organizer/SchedulesValidator';

const router = Router();

const schedulesController = new ScheduleController();

router.post('', [...schemas.register, handleValidationErrors], async (req: Request, res: Response) => { schedulesController.createSchedule(req, res); });
router.get('/:groupId', [...schemas.getSchedules, handleValidationErrors], async (req: Request, res: Response) => { schedulesController.getSchedules(req, res); });
router.get('/:scheduleId/group-id/:groupId', [...schemas.detail, handleValidationErrors], async (req: Request, res: Response) => { schedulesController.getSchedule(req, res); });
router.put('/:scheduleId', [...schemas.update, handleValidationErrors], async (req: Request, res: Response) => { schedulesController.updateSchedule(req, res); });

export default router;