import { IncludeOrganizerUseCase } from "../../usecases/organizer/groupOrganizer/IncludeOrganizerUseCase";
import { RemoveOrganizerUseCase } from "../../usecases/organizer/groupOrganizer/RemoveOrganizerUseCase";

export class GroupOrganizerFacade {

    private readonly includeOrganizerUseCase = new IncludeOrganizerUseCase();
    private readonly removeOrganizerUseCase = new RemoveOrganizerUseCase();

    constructor() {}

    public async includeOrganizer(groupId: number, organizerId: number): Promise<void> {
        return this.includeOrganizerUseCase.execute(groupId, organizerId);
    }

    public async removeOrganizer(groupId: number, organizerId: number): Promise<void> {
        return this.removeOrganizerUseCase.execute(groupId, organizerId);
    }


}
