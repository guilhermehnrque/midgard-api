import { LocalEntity } from "../../../../domain/entity/LocalEntity";
import { LocalDTO } from "../../../dto/organizer/local/LocalDTO";
import { LocalNotFoundError } from "../../../erros/local/LocalNotFoundError";
import { LocalService } from "../../../services/LocalService";

export class UpdateLocalUseCase {

    private readonly localService: LocalService;

    constructor() {
        this.localService = new LocalService();
    }

    public async execute(localDTO: LocalDTO, localIdPk: number): Promise<void> {
        const local = await this.localService.getLocalByIdPk(localIdPk);

        await this.checkLocal(local);

        const localEntity = await LocalEntity.fromUseCase({
            id: localIdPk,
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

    private async checkLocal(localEntity: LocalEntity | null){
        if (localEntity == null) {
            throw new LocalNotFoundError();
        }
    }

}