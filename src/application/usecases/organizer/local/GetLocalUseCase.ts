import { LocalOutputDTO } from "../../../dto/organizer/local/LocalOutputDTO";
import { GroupService } from "../../../services/GroupService";
import { LocalService } from "../../../services/LocalService";
import { UserService } from "../../../services/UserService";
import { OrganizerValidationService } from "../../../services/validation/OrganizerValidationService";

export class GetLocalsUseCase {

    private readonly userService: UserService;
    private readonly localService: LocalService;
    private readonly groupService: GroupService;
    private readonly organizerValidationService: OrganizerValidationService;

    constructor() {
        this.userService = new UserService();
        this.localService = new LocalService();
        this.groupService = new GroupService();
        this.organizerValidationService = new OrganizerValidationService();
    }

    async execute(userId: string, groupIdPk: number, localIdPk: number): Promise<LocalOutputDTO> {
        const user = await this.userService.getUserByUserId(userId);
        const group = await this.groupService.getGroupById(groupIdPk)

        await this.organizerValidationService.groupManagerAccess(user, group);

        const local = await this.localService.getLocalByIdPk(localIdPk);

        return LocalOutputDTO.fromEntity(local);

    }

}