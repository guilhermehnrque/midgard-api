import { LocalEntity } from "../../../../domain/entity/LocalEntity";
import { LocalDTO } from "../../../dto/organizer/local/LocalDTO";
import { LocalService } from "../../../services/LocalService";
import { UserService } from "../../../services/UserService";
import { OrganizerValidationService } from "../../../services/validation/OrganizerValidationService";

export class CreateLocalUseCase {

    private readonly userService: UserService;
    private readonly localService: LocalService;
    private readonly organizerValidationService: OrganizerValidationService;

    constructor() {
        this.userService = new UserService();
        this.localService = new LocalService();
        this.organizerValidationService = new OrganizerValidationService();
    }

    async execute(localDTO: LocalDTO, userId: string): Promise<void> {
        const user = await this.userService.getUserByUserId(userId);

        await this.organizerValidationService.validationOrganizerIsGroupOwner(user, localDTO.getGroupId());

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

        await this.localService.createLocal(localEntity);
    }

    private async localValidation(description: string, groupIdPk: number) {
        await this.localService.getLocalByDescriptionAndGroupId(description, groupIdPk)
    }
}