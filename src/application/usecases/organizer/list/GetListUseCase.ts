import { ListOutputDTO } from "../../../dto/organizer/list/ListOutputDTO";
import { ListBaseService } from "../../../services/ListBaseService";
import { UserService } from "../../../services/UserService";
import { OrganizerValidationService } from "../../../services/validation/OrganizerValidationService";

export class GetListUseCase {

    private readonly userService: UserService;
    private readonly listBaseService: ListBaseService;
    private readonly organizerValidationService: OrganizerValidationService;

    constructor() {
        this.userService = new UserService();
        this.listBaseService = new ListBaseService();
        this.organizerValidationService = new OrganizerValidationService();
    }

    public async execute(userId: string, groupIdPk: number, listIdPk: number): Promise<ListOutputDTO> {
        const user = await this.userService.getUserByUserId(userId);
        await this.organizerValidationService.validationOrganizerIsGroupOwner(user, groupIdPk);

        const lists = await this.listBaseService.getList(listIdPk);

        return ListOutputDTO.fromEntity(lists);
    }

}