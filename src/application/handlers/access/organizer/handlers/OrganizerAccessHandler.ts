
import { PermissionError } from "../../../../erros/PermissionError";
import { UserTypes } from "../../../../enums/UserTypes";
import { UserService } from "../../../../services/UserService";
import { AbstractHandler } from "../../../AbstractHandler";
import { OrganizerTypeAccess } from "../../../types/OrganizerTypeAccess";

export class OrganizerAccessHandler extends AbstractHandler {
    private readonly userService: UserService;

    constructor() {
        super();
        this.userService = new UserService();
    }

    public async handle(request: OrganizerTypeAccess): Promise<void> {
        const user = await this.userService.getUserByIdPk(request.userId!);
        
        if (!user || user.type !== UserTypes.ORGANIZER.toString()) {
            console.error(`[OrganizerAccessHandler] Access denied: User is not an organizer.`);
            throw new PermissionError("Access denied: User is not an organizer.");
        }

        super.handle(request);
    }
}
