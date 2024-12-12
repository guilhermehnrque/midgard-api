import { LocalNotFoundError } from "../../../../../application/erros/local/LocalNotFoundError";
import { GroupService } from "../../../../../application/services/GroupService";
import { LocalService } from "../../../../../application/services/LocalService";
import { AbstractOrganizerHandler } from "../AbstractOrganizerHandler";
import { OrganizerDomain } from "../domain/OrganizerDomain";

export class LocalHandler extends AbstractOrganizerHandler {

    private readonly localService: LocalService;

    constructor() {
        super();
        this.localService = new LocalService();
    }

    public async handle(request: OrganizerDomain): Promise<OrganizerDomain | null> {
        const local = await this.localService.getLocalByIdPk(request.localId!);
        
        if (local == null) {
            throw new LocalNotFoundError();
        }

        request.groupId = local.groups_id;

        return super.handle(request);
    }
}
