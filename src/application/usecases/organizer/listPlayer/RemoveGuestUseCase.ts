import { ListPlayerEntity } from "../../../../domain/entity/ListPlayerEntity";
import { PlayerNotFoundInListError } from "../../../erros/list/ListBaseErrors";
import { GroupService } from "../../../services/GroupService";
import { ListBaseService } from "../../../services/ListBaseService";
import { ListPlayerService } from "../../../services/ListPlayerService";
import { UserService } from "../../../services/UserService";
import { OrganizerValidationService } from "../../../services/validation/OrganizerValidationService";

export class RemovePlayerUseCase {

    private readonly userService: UserService;
    private readonly organizerValidationService: OrganizerValidationService;
    private readonly groupService: GroupService;
    private readonly listBaseService: ListBaseService;
    private readonly listPlayerService: ListPlayerService;

    constructor() {
        this.userService = new UserService();
        this.organizerValidationService = new OrganizerValidationService();
        this.groupService = new GroupService();
        this.listBaseService = new ListBaseService();
        this.listPlayerService = new ListPlayerService();
    }

    public async execute(userId: string, guestIdPk: number, listIdPk: number): Promise<void> {
        const user = await this.userService.getUserByUserId(userId);
        const list = await this.listBaseService.getList(listIdPk);
        const group = await this.groupService.getGroupById(list.getGroupIdPk())

        await this.organizerValidationService.groupManagerAccess(user, group);
        await this.organizerValidationService.listAccessPermissition(list, group.getGroupId())

        await this.isPlayertOnTheList(guestIdPk, listIdPk)

        const listPlayer = await ListPlayerEntity.fromUpdateUseCase({
            list_base_id: listIdPk,
            player_status: 'declined',
            guest_id: guestIdPk
        });

        await this.listPlayerService.removePlayerFromList(listPlayer);
    }

    private async isPlayertOnTheList(memberIdPk: number, listIdPk: number): Promise<void> {
        const response = await this.listPlayerService.validateGuestIsOnList(memberIdPk, listIdPk);

        if (!response) {
            console.error(`Player not found in list: ${memberIdPk})`)
            throw new PlayerNotFoundInListError();
        }
    }
}