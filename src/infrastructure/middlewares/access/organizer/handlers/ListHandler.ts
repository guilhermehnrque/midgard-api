import { ListNotFoundError } from "../../../../../application/erros/list/ListBaseErrors";
import { ListBaseService } from "../../../../../application/services/ListBaseService";
import { AbstractOrganizerHandler } from "../AbstractOrganizerHandler";
import { OrganizerDomain } from "../types/OrganizerDomain";

export class ListHandler extends AbstractOrganizerHandler {

    private readonly listBaseService: ListBaseService;

    constructor() {
        super();
        this.listBaseService = new ListBaseService();
    }

    public async handle(request: OrganizerDomain): Promise<OrganizerDomain | null> {
        const list = await this.listBaseService.getList(request.listId!);

        if (list == null) {
            throw new ListNotFoundError();
        }

        request.groupId = list.getGroupIdPk();

        return super.handle(request);
    }
}

