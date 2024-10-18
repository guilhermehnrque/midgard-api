import { Router, Request, Response } from 'express';
import { handleValidationErrors, schemas } from '../../middlewares/validators/organizer/GroupValidator';
import { GroupController } from '../../controllers/organizer/GroupController';

const router = Router();

const groupController = new GroupController();

router.get('', async (req: Request, res: Response) => { groupController.getGroups(req, res); });
router.post('', schemas.register, handleValidationErrors, async (req: Request, res: Response) => { groupController.createGroup(req, res); });
router.get('/:groupId', schemas.detail, handleValidationErrors, async (req: Request, res: Response) => { groupController.getGroup(req, res); });
router.put('/:groupId', schemas.update, handleValidationErrors, async (req: Request, res: Response) => { groupController.updateGroup(req, res); });

export default router;
