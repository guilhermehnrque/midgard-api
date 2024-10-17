import { LocalOutputDTO } from "../../../dto/organizer/local/LocalOutputDTO";
import { LocalService } from "../../../services/LocalService";
import { UserService } from "../../../services/UserService";
import { OrganizerValidationService } from "../../../services/validation/OrganizerValidationService";

export class GetLocalsUseCase {

    private readonly userService: UserService;
    private readonly localService: LocalService;
    private readonly organizerValidationService: OrganizerValidationService;

    constructor() {
        this.userService = new UserService();
        this.localService = new LocalService();
        this.organizerValidationService = new OrganizerValidationService();
    }

    async execute(userId: string, groupIdPk: number): Promise<LocalOutputDTO[]> {
        const user = await this.userService.getUserByUserId(userId);

        await this.organizerValidationService.managerAccess(user);

        const locals = await this.localService.getLocalsByGroupId(groupIdPk);

        return LocalOutputDTO.fromEntities(locals);

    }

}