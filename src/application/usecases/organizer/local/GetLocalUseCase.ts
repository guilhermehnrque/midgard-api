import { LocalEntity } from "../../../../domain/entity/LocalEntity";
import { LocalOutputDTO } from "../../../dto/organizer/local/LocalOutputDTO";
import { LocalNotFoundError } from "../../../erros/local/LocalNotFoundError";
import { LocalService } from "../../../services/LocalService";

export class GetLocalUseCase {

    private readonly localService: LocalService;

    constructor() {
        this.localService = new LocalService();
    }

    public async execute(localIdPk: number): Promise<LocalOutputDTO> {
        const local = await this.localService.getLocalByIdPk(localIdPk);

        await this.checkLocal(local);
        
        return LocalOutputDTO.fromEntity(local!);
    }

    private async checkLocal(localEntity: LocalEntity | null){
        if (localEntity == null) {
            throw new LocalNotFoundError();
        }
    }

}
