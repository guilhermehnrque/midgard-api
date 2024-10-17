import { ListPlayerEntity } from "../../../../domain/entity/ListPlayerEntity";
import { PlayerNotFoundInListError } from "../../../erros/list/ListBaseErrors";
import { GroupService } from "../../../services/GroupService";
import { ListBaseService } from "../../../services/ListBaseService";
import { ListPlayerService } from "../../../services/ListPlayerService";
import { UserService } from "../../../services/UserService";
import { OrganizerValidationService } from "../../../services/validation/OrganizerValidationService";

export class UpdatePlayerStatusUseCase {

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

    public async execute(userId: string, memberIdPk: number, listIdPk: number, playerListIdPk: number, status: string): Promise<void> {
        const user = await this.userService.getUserByUserId(userId);
        const list = await this.listBaseService.getList(listIdPk);
        const group = await this.groupService.getGroupById(list.getGroupIdPk())
        
        await this.organizerValidationService.groupManagerAccess(user, group);
        await this.organizerValidationService.listAccessPermissition(list, group.getGroupId())

        await this.isPlayertOnTheList(memberIdPk, listIdPk)

        const listPlayer = await ListPlayerEntity.fromUpdateUseCase({
            id: playerListIdPk,
            list_base_id: listIdPk,
            player_status: status,
            users_id: memberIdPk
        });

        await this.listPlayerService.updatePlayerStatus(listPlayer);
    }

    private async isPlayertOnTheList(memberIdPk: number, listIdPk: number): Promise<void> {
        const response = await this.listPlayerService.validatePlayerIsOnList(memberIdPk, listIdPk);

        if (!response) {
            console.error(`Player not found in list: ${memberIdPk})`)
            throw new PlayerNotFoundInListError();
        }
    }
}