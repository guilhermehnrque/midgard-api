import { CreateLocalRequest } from "../../../infrastructure/requests/organizer/local/CreateLocalRequest";
import { UpdateLocalRequest } from "../../../infrastructure/requests/organizer/local/UpdateLocalRequest";
import { LocalDTO } from "../../dto/organizer/local/LocalDTO";
import { OrganizerAccessService } from "../../services/validation/OrganizerAccessService";
import { CreateLocalUseCase } from "../../usecases/organizer/local/CreateLocalUseCase";
import { GetLocalsUseCase } from "../../usecases/organizer/local/GetLocalsUseCase";
import { GetLocalUseCase } from "../../usecases/organizer/local/GetLocalUseCase";
import { UpdateLocalUseCase } from "../../usecases/organizer/local/UpdateLocalUseCase";

export class LocalFacade {

    private readonly createLocalUseCase: CreateLocalUseCase;
    private readonly updateLocalUseCase: UpdateLocalUseCase;
    private readonly getLocalsUseCase: GetLocalsUseCase;
    private readonly getLocalUseCase: GetLocalUseCase;
    private readonly organizerAccessService: OrganizerAccessService;

    constructor() {
        this.createLocalUseCase = new CreateLocalUseCase();
        this.updateLocalUseCase = new UpdateLocalUseCase();
        this.getLocalUseCase = new GetLocalUseCase();
        this.getLocalsUseCase = new GetLocalsUseCase();
        this.organizerAccessService = new OrganizerAccessService();
    }

    public async createLocal(request: CreateLocalRequest, userId: string): Promise<void> {
        const { description, country, state, city, street, zipCode, number, groupId } = request;
        const localDTO = new LocalDTO({ description, country, state, city, street, zipCode, number, groupsId: groupId });

        await this.organizerAccessService.validateAccess({ userId, groupId });
        await this.createLocalUseCase.execute(localDTO);
    }

    public async updateLocal(request: UpdateLocalRequest, userId: string, localIdPk: number): Promise<void> {
        const { description, country, state, city, street, zipCode, number, groupId } = request;
        const localDTO = new LocalDTO({ description, country, state, city, street, zipCode, number, groupsId: groupId });

        await this.organizerAccessService.validateAccess({ userId, groupId });
        await this.updateLocalUseCase.execute(localDTO, localIdPk);
    }

    public async getLocals(groupIdPk: number, userId: string): Promise<any[]> {
        await this.organizerAccessService.validateAccess({ userId, groupId: groupIdPk });
        return await this.getLocalsUseCase.execute(groupIdPk);
    }

    public async getLocal(localIdPk: number, groupIdPk: number, userId: string): Promise<any> {
        await this.organizerAccessService.validateAccess({ userId, groupId: groupIdPk });
        return await this.getLocalUseCase.execute(localIdPk);
    }

}