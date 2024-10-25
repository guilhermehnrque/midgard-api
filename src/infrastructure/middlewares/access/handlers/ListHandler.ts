import { BaseOrganizer } from "../types/BaseOrganizer";
import { BaseOrganizerHandler } from "../BaseOrganizerHandler";
import { ListBaseService } from "../../../../application/services/ListBaseService";

export class ListHandler extends BaseOrganizerHandler {

    private readonly listBaseService: ListBaseService;

    constructor() {
        super();
        this.listBaseService = new ListBaseService();
    }

    public async handle(request: BaseOrganizer): Promise<BaseOrganizer | null> {
        const list = await this.listBaseService.getList(request.listId!);

        request.groupId = list.getGroupIdPk();

        return super.handle(request);
    }
}

