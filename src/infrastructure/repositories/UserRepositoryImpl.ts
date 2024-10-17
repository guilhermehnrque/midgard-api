import { UserEntity } from "../../domain/entity/UserEntity";
import { User as UserModel } from "../../domain/models/UserModel";
import { UserRepositoryInterface } from "../../domain/repositories/UserRepositoryInterface";
import { CustomError } from "../../application/erros/CustomError";
import { DatabaseError } from "../../application/erros/DatabaseError";
import { Op } from "sequelize";

export class UserRepositoryImpl implements UserRepositoryInterface {

    async createUser(registerPayload: UserEntity): Promise<UserModel> {
        try {
            const user = UserModel.build(registerPayload.registerPayload());
            return await user.save();
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[UserRepository] createUser -> Error creating group: ${customError.message}`);
        }
    }

    async updateUser(user: UserEntity): Promise<number> {
        try {
            const [affectedCount] = await UserModel.update(user.updatePayload(), {
                where: {
                    id: user.id,
                }
            });

            return affectedCount;
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[UserRepository] updateUser -> Error updating user: ${customError.message}`);
        }

    }

    async getUserByUserId(userId: string): Promise<UserModel | null> {
        try {
            return await UserModel.findOne({
                where: {
                    user_id: userId,
                }
            });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[UserRepository] getUserByUserId -> Error getting user: ${customError.message}`);
        }
    }

    async getUserByPhone(phoneNumber: number): Promise<UserModel | null> {
        try {
            return await UserModel.findOne({
                where: {
                    phone_number: phoneNumber
                },
            });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[UserRepository] getUserByLoginEmailOrPhone -> Error getting user by phone: ${customError.message}`);
        }
    }

    async getUserByPK(userId: number): Promise<UserModel | null> {
        try {
            return await UserModel.findOne({ where: { id: userId } });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[UserRepository] getUserByPK -> Error getting user: ${customError.message}`);
        }

    }

    public async getUserByLogin(login: string): Promise<UserModel | null> {
        try {
            return await UserModel.findOne({
                where: {
                    login: login
                },
            });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[UserRepository] getUserByLogin -> ${customError.message}`);
        }
    }

    async getUserByResetPasswordToken(token: string): Promise<UserModel | null> {
        try {
            return UserModel.findOne({
                where: {
                    reset_password_token: token,
                    reset_password_expires: { [Op.gt]: new Date() }
                },
            });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[UserRepository] Get user by token -> Error getting user by token: ${customError.message}`);
        }

    }


}