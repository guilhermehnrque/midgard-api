import { LocalOutputDTO } from "../../../dto/organizer/local/LocalOutputDTO";
import { LocalService } from "../../../services/LocalService";

export class GetLocalsUseCase {

    private readonly localService: LocalService;

    constructor() {
        this.localService = new LocalService();
    }

    public async execute(groupIdPk: number): Promise<LocalOutputDTO[]> {
        const locals = await this.localService.getLocalsByGroupId(groupIdPk);

        return LocalOutputDTO.fromEntities(locals);
    }

}
