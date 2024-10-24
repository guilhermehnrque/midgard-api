import { GroupOrganizerHandler } from "./handlers/GroupOrganizerHandler";
import { ListAccessHandler } from "./handlers/ListAccessHandler";
import { OrganizerAccessHandler } from "./handlers/OrganizerAccessHandler";
import { ScheduleAccessHandler } from "./handlers/ScheduleAccessHandler";

export class AccessValidationHandler {

    private readonly organizerAccess: OrganizerAccessHandler;
    private readonly groupOrganizerAccess: GroupOrganizerHandler;
    private readonly listAccessHandler: ListAccessHandler;
    private readonly scheduleAccessHandler: ScheduleAccessHandler;

    constructor() {
        this.organizerAccess = new OrganizerAccessHandler();
        this.groupOrganizerAccess = new GroupOrganizerHandler();
        this.listAccessHandler = new ListAccessHandler();
        this.scheduleAccessHandler = new ScheduleAccessHandler();
    }

    public async organizerAccessValidation(userId?: number): Promise<void> {
        await this.organizerAccess.handle({ userId });
    }

    public async groupOrganizerAccessValidation(userId?: number, groupId?: number): Promise<void> {
        this.organizerAccess.setNext(this.groupOrganizerAccess);
        await this.organizerAccess.handle({ userId, groupId });
    }

    public async listOrganizerAccessValidation(userId?: number, listId?: number): Promise<void> {
        this.organizerAccess.setNext(this.listAccessHandler);
        await this.organizerAccess.handle({ userId, listId });
    }

    public async scheduleOrganizerAccessValidation(userId?: number, scheduleId?: number): Promise<void> {
        this.organizerAccess.setNext(this.scheduleAccessHandler);
        await this.organizerAccess.handle({ userId, scheduleId });
    }
}
