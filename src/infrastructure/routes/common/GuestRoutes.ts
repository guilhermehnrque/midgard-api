import { Router, Request, Response } from 'express';
import { schemas, handleValidationErrors } from '../../middlewares/validators/common/GuestValidator';
import { GuestController } from '../../controllers/common/GuestController';

export class GuestRoutes {
    public readonly router: Router;
    private readonly guestController: GuestController;

    constructor() {
        this.router = Router();
        this.guestController = new GuestController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/register', [...schemas.register, handleValidationErrors.handle], (request: Request, response: Response) =>
            this.guestController.createGuest(request, response)
        );

        this.router.get('/', (request: Request, response: Response) =>
            this.guestController.getGuests(request, response)
        );

        this.router.put('/:guestId/update', [...schemas.updateGuest, handleValidationErrors.handle], (request: Request, response: Response) =>
            this.guestController.updateGuest(request, response)
        );

        this.router.delete('/:guestId/delete', [...schemas.deleteGuest, handleValidationErrors.handle], (request: Request, response: Response) =>
            this.guestController.deleteGuest(request, response)
        );
    }
}
