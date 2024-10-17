import { ListBaseEntity } from "../../../../domain/entity/ListBaseEntity";
import { ListDTO } from "../../../dto/organizer/list/ListDTO";
import { ListBaseService } from "../../../services/ListBaseService";
import { UserService } from "../../../services/UserService";
import { OrganizerValidationService } from "../../../services/validation/OrganizerValidationService";

export class CreateListUseCase {

    private readonly userService: UserService;
    private readonly listBaseService: ListBaseService;
    private readonly organizerValidationService: OrganizerValidationService;

    constructor() {
        this.userService = new UserService();
        this.listBaseService = new ListBaseService();
        this.organizerValidationService = new OrganizerValidationService(); 
    }

    public async execute(userId: string, listDTO: ListDTO): Promise<void> {
        const user = await this.userService.getUserByUserId(userId);
        await this.organizerValidationService.validationOrganizerIsGroupOwner(user, listDTO.groupId);

        const listEntity = await ListBaseEntity.fromCreateUseCase({
            status: true,
            player_limit: listDTO.playerLimit,
            starting_time: listDTO.startingTime,
            ending_time: listDTO.endingTime,
            day_of_week: listDTO.dayOfWeek,
            groups_id: listDTO.groupId,
            locals_id: listDTO.localId
        });

        await this.listBaseService.createList(listEntity);
    }

}