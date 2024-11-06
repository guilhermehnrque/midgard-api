import { ListPlayerOutputDTO } from "../../../dto/organizer/listPlayer/ListPlayerOutputDTO";
import { ListPlayerService } from "../../../services/ListPlayerService";
import { UserService } from "../../../services/UserService";

export class GetPlayersUseCase {

    private readonly userService: UserService
    private readonly listPlayerService: ListPlayerService;

    constructor() {
        this.listPlayerService = new ListPlayerService();
        this.userService = new UserService();
    }

    public async execute(listBaseIdPk: number): Promise<ListPlayerOutputDTO[]> {
        const listPlayers = await this.listPlayerService.getListPlayersByListId(listBaseIdPk);

        const players: ListPlayerOutputDTO[] = await Promise.all(
            listPlayers.map(async player => {
                const fullName = await this.getFullName(player.users_id!);
                return new ListPlayerOutputDTO(player.id!, player.users_id!, player.player_status, fullName);
            })
        );

        return players;
    }

    private async getFullName(userIdPk: number): Promise<string> {
        const user = await this.userService.getUserByIdPk(userIdPk);

        return user.getFullname();
    }

}