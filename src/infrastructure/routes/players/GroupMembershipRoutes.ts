import { Router, Request, Response } from "express";
import { GroupMembershipController } from "../../controllers/player/GroupMembershipController";
import { schemas, handleValidationErrors } from "../../middlewares/validators/players/GroupMembershipValidator";

export class GroupMembershipRouter {

    public readonly router: Router;
    private readonly groupMembershipController: GroupMembershipController;

    constructor() {
        this.router = Router();
        this.groupMembershipController = new GroupMembershipController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('', [...schemas.joinGroup, handleValidationErrors.handle], (req: Request, res: Response) =>
            this.groupMembershipController.joinGroup(req, res)
        );

        this.router.delete('', [...schemas.leaveGroup, handleValidationErrors.handle], (req: Request, res: Response) =>
            this.groupMembershipController.leaveGroup(req, res)
        );

        this.router.get('/groups', (req: Request, res: Response) =>
            this.groupMembershipController.getGroups(req, res)
        );

        this.router.get('/group/:groupId', [...schemas.getMembers, handleValidationErrors.handle], (req: Request, res: Response) =>
            this.groupMembershipController.getGroupMembership(req, res)
        );
        this.router.get('/group/:groupId/details', [...schemas.getGroupDetails, handleValidationErrors.handle], (req: Request, res: Response) =>
            this.groupMembershipController.getGroupDetails(req, res)
        );
    }
}