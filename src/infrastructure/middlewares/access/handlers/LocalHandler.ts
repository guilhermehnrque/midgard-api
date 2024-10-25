import { BaseOrganizer } from "../types/BaseOrganizer";
import { BaseOrganizerHandler } from "../BaseOrganizerHandler";
import { LocalNotFoundError } from "../../../../application/erros/local/LocalNotFoundError";
import { GroupService } from "../../../../application/services/GroupService";
import { LocalService } from "../../../../application/services/LocalService";

export class LocalHandler extends BaseOrganizerHandler {

    private readonly groupService: GroupService;
    private readonly localService: LocalService;

    constructor() {
        super();
        this.groupService = new GroupService();
        this.localService = new LocalService();
    }

    public async handle(request: BaseOrganizer): Promise<BaseOrganizer | null> {
        const local = await this.localService.getLocalByIdPk(request.localId!);
        
        if (local == null) {
            throw new LocalNotFoundError();
        }

        request.groupId = local.groups_id;

        return super.handle(request);
    }
}
