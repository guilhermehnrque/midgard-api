import { LocalOutputDTO } from "../../../dto/organizer/local/LocalOutputDTO";
import { LocalNotFoundError } from "../../../erros/local/LocalNotFoundError";
import { LocalService } from "../../../services/LocalService";

export class GetLocalUseCase {

    private readonly localService: LocalService;

    constructor() {
        this.localService = new LocalService();
    }

    async execute(localIdPk: number): Promise<LocalOutputDTO> {
        const local = await this.localService.getLocalByIdPk(localIdPk);

        if (!local || local == null) {
            console.error(`[GetLocalUseCase] -> Local not found ${localIdPk}`);
            throw new LocalNotFoundError();
        }
        
        return LocalOutputDTO.fromEntity(local);
    }

}