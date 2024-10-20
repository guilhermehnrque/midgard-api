import { Router, Request, Response } from "express";
import { schemas } from "../../middlewares/validators/organizer/PlayerListValidator";
import { ListPlayerController } from "../../controllers/organizer/ListPlayerController";
import ValidationErrorHandler from "../../middlewares/validators/ValidatorHandler";

export class ListPlayerRouter {

    public readonly router: Router;
    private readonly listPlayerController: ListPlayerController;

    constructor() {
        this.router = Router();
        this.listPlayerController = new ListPlayerController();
        this.initializeRoutes();
    }
    
    private initializeRoutes(): void {
        this.router.get('/:listId', (req: Request, res: Response) =>
            this.listPlayerController.getListPlayers(req, res)
        );

        this.router.put('/:listPlayerId', [...schemas.updateListPlayer, ValidationErrorHandler.handle], (req: Request, res: Response) =>
            this.listPlayerController.updateListPlayer(req, res)
        );

        this.router.post('/player', [...schemas.addPlayerMemberOnList, ValidationErrorHandler.handle], (req: Request, res: Response) =>
            this.listPlayerController.addPlayerMemberOnList(req, res)
        );

        this.router.delete('/remove-player', [...schemas.removePlayerMemberOnList, ValidationErrorHandler.handle], (req: Request, res: Response) =>
            this.listPlayerController.removePlayerMemberOnList(req, res)
        );

        this.router.post('/guest', [...schemas.addGuestMemberOnList, ValidationErrorHandler.handle], (req: Request, res: Response) =>
            this.listPlayerController.addGuestOnList(req, res)
        );

        this.router.delete('/guest', [...schemas.removeGuestMemberOnList, ValidationErrorHandler.handle], (req: Request, res: Response) =>
            this.listPlayerController.removePlayerMemberOnList(req, res)
        );

    }
}
