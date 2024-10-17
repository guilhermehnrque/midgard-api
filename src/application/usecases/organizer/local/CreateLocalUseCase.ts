import { LocalEntity } from "../../../../domain/entity/LocalEntity";
import { LocalDTO } from "../../../dto/organizer/local/LocalDTO";
import { LocalService } from "../../../services/LocalService";

export class CreateLocalUseCase {

    private readonly localService: LocalService;

    constructor() {
        this.localService = new LocalService();
    }

    async execute(localDTO: LocalDTO): Promise<void> {
        await this.localValidation(localDTO.getDescription(), localDTO.getGroupId())

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