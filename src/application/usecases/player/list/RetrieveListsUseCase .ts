import { ListBaseEntity } from "../../../../domain/entity/ListBaseEntity";
import { ListsOutputDTO } from "../../../dto/player/lists/ListsOutputDTO";
import { UsertNotGroupMember } from "../../../erros/groupUser/UsertNotGroupMember";
import { GroupService } from "../../../services/GroupService";
import { GroupUserService } from "../../../services/GroupUserService";
import { ListBaseService } from "../../../services/ListBaseService";
import { ListPlayerService } from "../../../services/ListPlayerService";

export class FetchListsUseCase {

    private readonly groupService: GroupService;
    private readonly groupUserService: GroupUserService;
    private readonly listBaseService: ListBaseService;
    private readonly listPlayersService: ListPlayerService;

    constructor() {
        this.groupService = new GroupService();
        this.groupUserService = new GroupUserService();
        this.listBaseService = new ListBaseService();
        this.listPlayersService = new ListPlayerService();
    }

    public async execute(groupIdPk: number, userIdPk: number): Promise<{ active: ListsOutputDTO[]; inactive: ListsOutputDTO[] }> {
        await this.groupService.ensureGroupExists(groupIdPk);
        await this.isGroupMember(userIdPk, groupIdPk);

        const lists = await this.listBaseService.getListsByGroupId(groupIdPk);

        return this.prepareOutput(lists);
    }

    private prepareOutput(lists: ListBaseEntity[]) {
        const activeLists = lists.filter((list) => list.isListActive());
        const inactiveLists = lists.filter((list) => !list.isListActive());

        return {
            active: activeLists.map((list) => this.toDTO(list)),
            inactive: inactiveLists.map((list) => this.toDTO(list)),
        };
    }

    private toDTO(list: ListBaseEntity): ListsOutputDTO {
        return new ListsOutputDTO(
            list.id!,
            list.starting_time,
            list.ending_time,
            list.day_of_week,
            list.getConfirmedPlayers()
        );
    }

    // TODO: mover validação para o facade
    private async isGroupMember(userIdPk: number, groupIdPk: number): Promise<void> {
        const groupUser = await this.groupUserService.getGroupUsersByGroupIdAndUserIdPk(userIdPk, groupIdPk);

        if (groupUser == null) {
            console.error(`[JoinGroupUseCase] -> User not in group`);
            throw new UsertNotGroupMember();
        }
    }

    private async countConfirmedPlayers(groupIdPk: number): Promise<number> {
        return await this.listPlayersService.countPlayersByStatus(groupIdPk, 'confirmed');
    }
}
