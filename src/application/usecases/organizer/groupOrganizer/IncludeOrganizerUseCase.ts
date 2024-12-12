import { GroupOrganizersRepositoryImpl } from "../../../../infrastructure/repositories/GroupOrganizersRepositoryImpl";
import { AlreadyGroupOrganizerError } from "../../../erros/groupOrganizer/AlreadyGroupOrganizerError";
import { OrganizerCreatedGroupSubject } from "../../../observers/OrganizerCreatedGroupSubject";

export class IncludeOrganizerUseCase {

    private readonly groupOrganizerRepository = new GroupOrganizersRepositoryImpl();
    private organizerCreatedGroupSubject = OrganizerCreatedGroupSubject.getInstance();
    
    constructor() {
        this.organizerCreatedGroupSubject.subscribe(this);
    }

    public async execute(groupId: number, organizerId: number): Promise<void> {
        await this.checkOrganizerAlreadyInGroup(groupId, organizerId);

        await this.groupOrganizerRepository.includeOrganizers(groupId, organizerId);
    }

    private async checkOrganizerAlreadyInGroup(groupId: number, organizerId: number): Promise<void> {
        const groupOrganizer = await this.groupOrganizerRepository.getOrganizerByGroupId(groupId, organizerId);

        if (!groupOrganizer) {
            return
        }

        throw new AlreadyGroupOrganizerError();
    }

    public async save(groupId: number, membersId: number[]): Promise<void> {
        await this.execute(groupId, membersId[0]);
    }

}
