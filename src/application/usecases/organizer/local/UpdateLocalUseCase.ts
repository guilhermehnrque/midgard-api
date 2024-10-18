import { LocalEntity } from "../../../../domain/entity/LocalEntity";
import { LocalDTO } from "../../../dto/organizer/local/LocalDTO";
import { LocalService } from "../../../services/LocalService";

export class UpdateLocalUseCase {

    private readonly localService: LocalService;

    constructor() {
        this.localService = new LocalService();
    }

    public async execute(localDTO: LocalDTO): Promise<void> {
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

}