import { Router, Request, Response } from "express";
import { GroupMembershipController } from "../../controllers/player/GroupMembershipController";
import { handleValidationErrors } from "../../middlewares/validators/auth/AuthValidator";
import { getGroupDetailsValidation, getMembersValidation, joinGroupValidation, leaveGroupValidation } from "../../middlewares/validators/players/GroupMembershipValidator";


export class GroupMembershipRouter {

    public readonly router: Router;
    private readonly groupMembershipController: GroupMembershipController;

    constructor() {
        this.router = Router();
        this.groupMembershipController = new GroupMembershipController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('', joinGroupValidation, handleValidationErrors.handle, (req: Request, res: Response) =>
            this.groupMembershipController.joinGroup(req, res)
        );

        this.router.delete('', leaveGroupValidation, handleValidationErrors.handle, (req: Request, res: Response) =>
            this.groupMembershipController.leaveGroup(req, res)
        );

        this.router.get('/groups', (req: Request, res: Response) =>
            this.groupMembershipController.getGroups(req, res)
        );

        // TODO CHANGE THIS ROUTE TO RETURN LIST OF GROUP MEMBERSHIPS ->  joined-groups
        this.router.get('/group/:groupId', getMembersValidation, handleValidationErrors.handle, (req: Request, res: Response) =>
            this.groupMembershipController.getGroupMembership(req, res)
        );

        this.router.get('/group/:groupId/details', getGroupDetailsValidation, handleValidationErrors.handle, (req: Request, res: Response) =>
            this.groupMembershipController.getGroupDetails(req, res)
        );

    }
}