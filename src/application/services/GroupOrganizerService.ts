import { GroupOrganizersRepositoryImpl } from "../../infrastructure/repositories/GroupOrganizersRepositoryImpl";

export class GroupOrganizerService {

    private readonly groupOrganizerRepository = new GroupOrganizersRepositoryImpl(); 

    constructor() {}

    public async isGroupOrganizer(userIdPk: number, groupId: number): Promise<boolean> {
        const group = await this.groupOrganizerRepository.getOrganizerByGroupId(groupId, userIdPk);

        return group !== null;
    }
}