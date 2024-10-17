import { LocalOutputDTO } from "../../../dto/organizer/local/LocalOutputDTO";
import { LocalService } from "../../../services/LocalService";

export class GetLocalUseCase {

    private readonly localService: LocalService;

    constructor() {
        this.localService = new LocalService();
    }

    async execute(localIdPk: number): Promise<LocalOutputDTO> {
        const local = await this.localService.getLocalByIdPk(localIdPk);

        return LocalOutputDTO.fromEntity(local);
    }

}