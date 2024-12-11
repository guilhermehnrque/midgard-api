import { GroupOrganizers } from "../../domain/models/GroupOrganizersModel";
import { GroupOrganizersRepositoryInterface } from "../../domain/repositories/GroupOrganizersRepositoryInterface";
import { CustomError } from "../../application/erros/CustomError";

export class GroupOrganizersRepositoryImpl implements GroupOrganizersRepositoryInterface {
    public async includeOrganizers(groupId: number, userIdPk: number): Promise<void> {
        try {
            await GroupOrganizers.create({ groups_id: groupId, users_id: userIdPk });
        } catch (error) {
            const customError = error as CustomError;
            throw new CustomError(`[GroupOrganizersRepositoryImpl] includeOrganizers -> ${customError.message}`);
        }
    }

    public async removeOrganizer(groupId: number, userIdPk: number): Promise<void> {
        try {
            await GroupOrganizers.destroy({ where: { groups_id: groupId, users_id: userIdPk } });
        } catch (error) {
            const customError = error as CustomError;
            throw new CustomError(`[GroupOrganizersRepositoryImpl] removeOrganizer -> ${customError.message}`);
        }
    }

    public async checkAlreadyOrganizer(groupId: number, userIdPk: number): Promise<GroupOrganizers | null> {
        try {
            return await GroupOrganizers.findOne({ where: { groups_id: groupId, users_id: userIdPk } });
        } catch (error) {
            const customError = error as CustomError;
            throw new CustomError(`[GroupOrganizersRepositoryImpl] checkAlreadyOrganizer -> ${customError.message}`);
        }
    }
}