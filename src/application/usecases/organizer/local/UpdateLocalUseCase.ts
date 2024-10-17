import { LocalEntity } from "../../../../domain/entity/LocalEntity";
import { LocalDTO } from "../../../dto/organizer/local/LocalDTO";
import { GroupService } from "../../../services/GroupService";
import { LocalService } from "../../../services/LocalService";
import { UserService } from "../../../services/UserService";
import { OrganizerValidationService } from "../../../services/validation/OrganizerValidationService";

export class UpdateLocalUseCase {

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

    async execute(localDTO: LocalDTO, userId: string): Promise<void> {
        const user = await this.userService.getUserByUserId(userId);
        const group = await this.groupService.getGroupById(localDTO.getGroupId())

        await this.organizerValidationService.groupManagerAccess(user, group);

        this.localValidation(localDTO.getDescription(), localDTO.getGroupId())

        const localEntity = await LocalEntity.fromUseCase({
            description: localDTO.getDescription(),
            country: localDTO.getCountry(),
            state: localDTO.getState(),
            city: localDTO.getCity(),
            street: localDTO.getStreet(),
            zip_code: localDTO.getZipCode(),
            number: localDTO.getNumber(),
            groups_id: localDTO.getGroupId(),
        })

        await this.localService.updateLocal(localEntity);
    }

    private async localValidation(description: string, groupIdPk: number) {
        await this.localService.ensureLocalNotExists(description, groupIdPk)
    }
}