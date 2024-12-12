import { Router, Request, Response } from "express";
import { schemas, handleValidationErrors } from "../../middlewares/validators/organizer/PlayerListValidator";
import { ListPlayerController } from "../../controllers/organizer/ListPlayerController"
import { OrganizerHandler } from "../../middlewares/access/organizer/OrganizerHandler";

export class ListPlayerRouter {

    public readonly router: Router;
    private readonly listPlayerController: ListPlayerController;
    private readonly accessHandler: OrganizerHandler;

    constructor() {
        this.router = Router();
        this.listPlayerController = new ListPlayerController();
        this.accessHandler = new OrganizerHandler();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/:listId', [...schemas.getListPlayer, handleValidationErrors.handle, this.accessHandler.listAccess.bind(this.accessHandler)],
            (req: Request, res: Response) =>
                this.listPlayerController.getListPlayers(req, res)
        );

        this.router.put('/:listId/update', [...schemas.updateListPlayer, handleValidationErrors.handle, this.accessHandler.listAccess.bind(this.accessHandler)],
            (req: Request, res: Response) =>
                this.listPlayerController.updateListPlayer(req, res)
        );

        this.router.post('', [...schemas.addPlayerMemberOnList, handleValidationErrors.handle, this.accessHandler.listAccess.bind(this.accessHandler)],
            (req: Request, res: Response) =>
                this.listPlayerController.addPlayerMemberOnList(req, res)
        );

        this.router.delete('/:listId/players/:playerId', [...schemas.removePlayerMemberOnList, handleValidationErrors.handle, this.accessHandler.listAccess.bind(this.accessHandler)],
            (req: Request, res: Response) =>
                this.listPlayerController.removePlayerMemberOnList(req, res)
        );

        this.router.post('/guest', [...schemas.addGuestMemberOnList, handleValidationErrors.handle],
            (req: Request, res: Response) =>
                this.listPlayerController.addGuestOnList(req, res)
        );

        this.router.delete('/guest', [...schemas.removeGuestMemberOnList, handleValidationErrors.handle],
            (req: Request, res: Response) =>
                this.listPlayerController.removePlayerMemberOnList(req, res)
        );
    }
}
