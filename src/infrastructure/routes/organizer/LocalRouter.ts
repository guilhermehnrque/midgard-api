import { Router, Request, Response } from 'express';
import { handleValidationErrors, schemas } from '../../middlewares/validators/organizer/LocalValidator';
import { LocalController } from '../../controllers/organizer/LocalController';

const router = Router();

const localController = new LocalController();

router.post('', [...schemas.register, handleValidationErrors], async (req: Request, res: Response) => { localController.createLocal(req, res); });
router.put('/:localId', [...schemas.update, handleValidationErrors], async (req: Request, res: Response) => { localController.updateLocal(req, res); });
router.get('/:groupId', [...schemas.getLocals, handleValidationErrors], async (req: Request, res: Response) => { localController.getLocals(req, res); });
router.get('/:localId/group-id/:groupId', [...schemas.detail, handleValidationErrors], async (req: Request, res: Response) => { localController.getLocal(req, res); });

export default router;
