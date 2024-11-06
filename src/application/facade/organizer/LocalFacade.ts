import { CreateLocalRequest } from "../../../infrastructure/requests/organizer/local/CreateLocalRequest";
import { UpdateLocalRequest } from "../../../infrastructure/requests/organizer/local/UpdateLocalRequest";
import { LocalDTO } from "../../dto/organizer/local/LocalDTO";
import { CreateLocalUseCase } from "../../usecases/organizer/local/CreateLocalUseCase";
import { GetLocalsUseCase } from "../../usecases/organizer/local/GetLocalsUseCase";
import { GetLocalUseCase } from "../../usecases/organizer/local/GetLocalUseCase";
import { UpdateLocalUseCase } from "../../usecases/organizer/local/UpdateLocalUseCase";

export class LocalFacade {

    private readonly createLocalUseCase: CreateLocalUseCase;
    private readonly updateLocalUseCase: UpdateLocalUseCase;
    private readonly getLocalsUseCase: GetLocalsUseCase;
    private readonly getLocalUseCase: GetLocalUseCase;

    constructor() {
        this.createLocalUseCase = new CreateLocalUseCase();
        this.updateLocalUseCase = new UpdateLocalUseCase();
        this.getLocalUseCase = new GetLocalUseCase();
        this.getLocalsUseCase = new GetLocalsUseCase();
    }

    public async createLocal(request: CreateLocalRequest, userId: number): Promise<void> {
        const { description, country, state, city, street, zipCode, number, groupId } = request;
        const localDTO = new LocalDTO({ description, country, state, city, street, zipCode, number, groupsId: groupId });

        await this.createLocalUseCase.execute(localDTO);
    }

    public async updateLocal(request: UpdateLocalRequest, userId: number, localIdPk: number): Promise<void> {
        const { description, country, state, city, street, zipCode, number, groupId } = request;
        const localDTO = new LocalDTO({ description, country, state, city, street, zipCode, number, groupsId: groupId });

        await this.updateLocalUseCase.execute(localDTO, localIdPk);
    }

    public async getLocals(groupIdPk: number, userId: number): Promise<any[]> {
        return await this.getLocalsUseCase.execute(groupIdPk);
    }

    public async getLocal(localIdPk: number, userId: number): Promise<any> {
        return await this.getLocalUseCase.execute(localIdPk);
    }

}
