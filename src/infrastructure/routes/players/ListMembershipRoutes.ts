import { Router, Request, Response } from "express";
import { ListMembershipController } from "../../controllers/player/ListMembershipController";
import { validateGetJoinedLists, validateGetLists, validateJoinList, validateLeaveList } from "../../middlewares/validators/players/ListMembershipValidator";
import { handleValidationErrors } from "../../middlewares/validators/auth/AuthValidator";

export class ListMembershipRoutes {
    
    public readonly router: Router;
    private readonly listMembershipController: ListMembershipController;

    constructor() {
        this.router = Router();
        this.listMembershipController = new ListMembershipController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        //TODO: Revalidar rotas, payloads e validações para equiparar com o swagger
        this.router.get("/groups/:groupId/lists", validateGetLists, handleValidationErrors.handle, (req: Request, res: Response) => this.listMembershipController.getLists(req, res));
        this.router.get("/joined-lists", validateGetJoinedLists, handleValidationErrors.handle, (req: Request, res: Response) => this.listMembershipController.getJoinedLists(req, res));
        this.router.post("/", validateJoinList, handleValidationErrors.handle,(req: Request, res: Response) => this.listMembershipController.joinList(req, res));
        this.router.delete("/", validateLeaveList, handleValidationErrors.handle, (req: Request, res: Response) => this.listMembershipController.leaveList(req, res));
    }
}