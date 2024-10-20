import { EnumValidatorError } from "../erros/ValidatorError";

export enum UserTypes {
    ADMIN = 'ADMIN',
    PLAYER = 'PLAYER',
    ORGANIZER = 'ORGANIZER',
}

export class UserTypesHelper {
    public static fromString(userType: string): UserTypes {

        if (Object.values(UserTypes).includes(userType as UserTypes)) {
            return userType as UserTypes;
        }

        throw new EnumValidatorError(`InvalidUserType "${userType}"`);
    }

}