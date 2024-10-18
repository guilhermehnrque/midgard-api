import { Router, Request, Response } from 'express';
import { schemas, handleValidationErrors } from '../../middlewares/validators/organizer/ListValidator';
import { ListController } from '../../controllers/organizer/ListController';

const router = Router();

const listController = new ListController();

router.post('', [...schemas.register, handleValidationErrors], async (req: Request, res: Response) => { listController.createList(req, res) });
router.get('/:groupId', [...schemas.get, handleValidationErrors], async (req: Request, res: Response) => { listController.getLists(req, res) });
router.get('/:listId/group-id/:groupId', [...schemas.details, handleValidationErrors], async (req: Request, res: Response) => { listController.getList(req, res) });
router.put('/:listId', [...schemas.update, handleValidationErrors], async (req: Request, res: Response) => { listController.updateList(req, res) });

export default router;