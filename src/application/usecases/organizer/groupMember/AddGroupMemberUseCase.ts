import { GroupUserEntity } from "../../../../domain/entity/GroupUserEntity";
import { OrganizerCreatedGroupObserver } from "../../../../domain/observers/OrganizerCreatedGroupObserver";
import { AddMemberToGroupError } from "../../../erros/groupUser/AddMemberToGroupError";
import { OrganizerCreatedGroupSubject } from "../../../observers/OrganizerCreatedGroupSubject";
import { GroupUserService } from "../../../services/GroupUserService";

export class AddGroupMemberUseCase implements OrganizerCreatedGroupObserver {

    private readonly groupUsersService: GroupUserService;

    constructor() {
        this.groupUsersService = new GroupUserService();
        const organizerCreatedGroupSubject = OrganizerCreatedGroupSubject.getInstance();
        organizerCreatedGroupSubject.subscribe(this);
    }

    public async execute(groupIdPk: number, membersId: Array<number>): Promise<void> {
        await this.validations(membersId, groupIdPk);

        const members = await Promise.all(membersId.map(async membersId => await GroupUserEntity.fromData({
            groups_id: groupIdPk,
            users_id: membersId
        })));

        await this.groupUsersService.registerUserToGroup(members);
    }

    private async validations(membersId: Array<number>, groupIdPk: number): Promise<void> {

        if ((membersId.length <= 0)) {
            throw new AddMemberToGroupError();
        }

        await this.checkAnyMemberAlreadyInGroup(membersId, groupIdPk);
    }

    private async checkAnyMemberAlreadyInGroup(membersId: Array<number>, groupIdPk: number): Promise<void> {
        await Promise.all(membersId.map(async memberId => await this.groupUsersService.ensureUserIsNotInGroup(memberId, groupIdPk)));
    }

    public async save(groupId: number, membersId: number[]): Promise<void> {
        await this.execute(groupId, membersId);
    }

}