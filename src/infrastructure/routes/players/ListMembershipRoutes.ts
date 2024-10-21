import { Router, Request, Response } from "express";
import { ListMembershipController } from "../../controllers/player/ListMembershipController";

export class ListPlayerRouter {
  private readonly router: Router;
  private readonly listMembershipController: ListMembershipController;

  constructor() {
    this.router = Router();
    this.listMembershipController = new ListMembershipController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/groups/:groupId/lists", (req: Request, res: Response) => this.listMembershipController.getLists(req, res));
    this.router.get("/joined-lists", (req: Request, res: Response) => this.listMembershipController.getJoinedLists(req, res));
    this.router.post("/", (req: Request, res: Response) => this.listMembershipController.joinList(req, res));
    this.router.delete("/", (req: Request, res: Response) => this.listMembershipController.leaveList(req, res));
  }
}