import { UserTypes } from "../enums/UserTypes";

export class UserTypeVO {

    public static readonly ADMIN: string = UserTypes.ADMIN.toString();
    public static readonly PLAYER: string = UserTypes.PLAYER.toString();
    public static readonly ORGANIZER: string = UserTypes.ORGANIZER.toString();

    public static fromString(userType: string): string {

        if (Object.values(UserTypes).includes(userType as UserTypes)) {
            return userType as UserTypes;
        }

        throw new Error(`InvalidUserType ${userType}`);

    }

    public static getPlayerType(): string {
        return UserTypeVO.PLAYER;
    }

    public static getOrganizerType(): string {
        return UserTypeVO.ORGANIZER;
    }

}