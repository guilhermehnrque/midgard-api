import { ListPlayerEntity } from "../../../../domain/entity/ListPlayerEntity";
import { PlayerAlreadyInListError } from "../../../erros/list/ListBaseErrors";
import { LimitOfPlayersError } from "../../../erros/listPlayer/LimitOfPlayersError";
import { GroupService } from "../../../services/GroupService";
import { ListBaseService } from "../../../services/ListBaseService";
import { ListPlayerService } from "../../../services/ListPlayerService";
import { UserService } from "../../../services/UserService";
import { OrganizerValidationService } from "../../../services/validation/OrganizerValidationService";

export class AddPlayerUseCase {

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

        await this.organizerValidationService.validationOrganizerIsGroupOwner(user, group.getGroupId());
        await this.organizerValidationService.listAccessPermissition(list, group.getGroupId())

        await this.isGuestAlreadyOnList(guestIdPk, listIdPk)
        await this.validateListLimit(list.getPlayerLimit(), listIdPk)

        const listPlayer = await ListPlayerEntity.fromCreateUseCase({
            list_base_id: listIdPk,
            player_status: 'pending',
            guest_id: guestIdPk
        });

        await this.listPlayerService.addPlayerToList(listPlayer);

    }

    private async validateListLimit(limitOfPlayers: number, listIdPk: number): Promise<void> {
        const listOfPlayers = await this.listPlayerService.getListPlayersByListId(listIdPk);
        const confirmedPlayers = listOfPlayers.filter(player => player.player_status == "confirmed");

        const totalConfirmed = confirmedPlayers.length

        if (totalConfirmed > limitOfPlayers) {
            throw new LimitOfPlayersError();
        }
    }

    private async isGuestAlreadyOnList(guestIdPk: number, listIdPk: number): Promise<void> {
        const response = await this.listPlayerService.validateGuestIsOnList(guestIdPk, listIdPk)

        if (response) {
            console.error(`Guest already in list: ${guestIdPk})`)
            throw new PlayerAlreadyInListError();
        }
    }
}