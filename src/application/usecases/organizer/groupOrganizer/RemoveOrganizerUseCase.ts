import { GroupOrganizersRepositoryImpl } from "../../../../infrastructure/repositories/GroupOrganizersRepositoryImpl";

export class RemoveOrganizerUseCase {

    private readonly groupOrganizerRepository = new GroupOrganizersRepositoryImpl();

    constructor() {}

    public async execute(groupId: number, organizerId: number): Promise<void> {
        await this.groupOrganizerRepository.removeOrganizer(groupId, organizerId);
    }

    public async save(groupId: number, organizerId: number): Promise<void> {
        await this.execute(groupId, organizerId);
    }

}
