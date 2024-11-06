import { Router, Request, Response } from "express";
import { GroupMemberController } from '../../controllers/organizer/GroupMemberController';
import { OrganizerHandler } from "../../middlewares/access/OrganizerHandler";

export class GroupMemberRouter {

    public readonly router: Router;
    private readonly groupMemberController: GroupMemberController;
    private readonly accessHandler: OrganizerHandler;

    constructor() {
        this.router = Router();
        this.groupMemberController = new GroupMemberController();
        this.accessHandler = new OrganizerHandler();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('', [this.accessHandler.groupAccess.bind(this.accessHandler)], (req: Request, res: Response) =>
            this.groupMemberController.addMember(req, res)
        );

        this.router.delete('/:memberId/group/:groupId', [this.accessHandler.groupAccess.bind(this.accessHandler)], (req: Request, res: Response) =>
            this.groupMemberController.removeMember(req, res)
        );

        this.router.get('/group/:groupId/members', [this.accessHandler.groupAccess.bind(this.accessHandler)], (req: Request, res: Response) =>
            this.groupMemberController.getMembers(req, res)
        );
    }
}