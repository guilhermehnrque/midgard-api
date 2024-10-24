import { Router, Request, Response } from "express";
import { GroupMemberController } from '../../controllers/organizer/GroupMemberController';

export class GroupMemberRouter {

    public readonly router: Router;
    private readonly groupMemberController: GroupMemberController;

    constructor() {
        this.router = Router();
        this.groupMemberController = new GroupMemberController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('', (req: Request, res: Response) =>
            this.groupMemberController.addMember(req, res)
        );

        this.router.delete('/:memberId/group/:groupId', (req: Request, res: Response) =>
            this.groupMemberController.removeMember(req, res)
        );

        this.router.get('/group/:groupId/members', (req: Request, res: Response) =>
            this.groupMemberController.getMembers(req, res)
        );
    }
}