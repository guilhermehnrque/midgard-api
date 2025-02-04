import { LocalEntity } from "../../../../domain/entity/LocalEntity";
import { LocalDTO } from "../../../dto/organizer/local/LocalDTO";
import { LocalAlreadyExistsError } from "../../../erros/local/LocalAlreadyExistsError";
import { LocalService } from "../../../services/LocalService";

export class CreateLocalUseCase {

    private readonly localService: LocalService;

    constructor() {
        this.localService = new LocalService();
    }

    async execute(localDTO: LocalDTO): Promise<void> {
        await this.checkLocal(localDTO.getDescription(), localDTO.getGroupId())

        const localEntity = await LocalEntity.fromUseCase({
            description: localDTO.getDescription(),
            country: localDTO.getCountry(),
            state: localDTO.getState(),
            city: localDTO.getCity(),
            street: localDTO.getStreet(),
            zip_code: localDTO.getZipCode(),
            number: localDTO.getNumber(),
            district: localDTO.getDistrict(),
            groups_id: localDTO.getGroupId(),
        })

        await this.localService.createLocal(localEntity);
    }

    private async checkLocal(description: string, groupIdPk: number) {
        const local = await this.localService.getLocalByDescriptionAndGroupId(description, groupIdPk)
        
        if (local) {
            throw new LocalAlreadyExistsError('Local already exists');
        }
    }
}
