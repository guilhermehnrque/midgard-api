import { LocalEntity } from "../../../../domain/entity/LocalEntity";
import { UserEntity } from "../../../../domain/entity/UserEntity";
import { LocalDTO } from "../../../dto/organizer/local/LocalDTO";
import { LocalService } from "../../../services/LocalService";
import { UserService } from "../../../services/UserService";

export class CreateLocalUseCase {

    private readonly userService: UserService;
    private readonly localService: LocalService;

    constructor() {
        this.userService = new UserService();
        this.localService = new LocalService();
    }

    async execute(localDTO: LocalDTO, userId: string): Promise<void> {
        const user = await this.userService.getUserByUserId(userId);

        this.userValidations(user)
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

    private async userValidations(userEntity: UserEntity) {
        await this.userService.ensureUserIsOrganizer(userEntity)
    }

    private async localValidation(description: string, groupIdPk: number) {
        await this.localService.getLocalByDescriptionAndGroupId(description, groupIdPk)
    }
}