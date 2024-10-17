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

    public async createLocal(request: any, userId: string): Promise<void> {
        const { groupId } = request;
        await this.organizerAccessService.validateAccess({ userId, groupId });
        await this.createLocalUseCase.execute(request);
    }

    public async updateLocal(request: any, userId: string): Promise<void> {
        const { groupId } = request;
        await this.organizerAccessService.validateAccess({ userId, groupId });
        await this.updateLocalUseCase.execute(request);
    }
    
    public async getLocals(request: any, userId: string): Promise<any[]> {
        const { groupId } = request;
        await this.organizerAccessService.validateAccess({ userId, groupId });
        return await this.getLocalsUseCase.execute(groupId);
    }

    public async getLocal(request: any, userId: string): Promise<any> {
        const { localIdPk, groupId } = request;
        await this.organizerAccessService.validateAccess({ userId, groupId });
        return await this.getLocalUseCase.execute(localIdPk);
    }

}