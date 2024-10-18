import { EnumValidatorError } from "../erros/ValidatorError";

export enum UserTypes {
    ADMIN = 'ADMIN',
    PLAYER = 'PLAYER',
    ORGANIZER = 'ORGANIZER',
    GUEST = 'GUEST',
}

export function allowedUserTypes(): UserTypes[] {
    return [UserTypes.PLAYER, UserTypes.ORGANIZER, UserTypes.GUEST];
}

export function allowUserToCreateGroup(userType: string): boolean {
    return userType === UserTypes.ORGANIZER.toString();
}

export class UserTypesHelper {
    public static fromString(userType: string): UserTypes {

        if (Object.values(UserTypes).includes(userType as UserTypes)) {
            return userType as UserTypes;
        }

        throw new EnumValidatorError(`InvalidUserType "${userType}"`);
    }

}