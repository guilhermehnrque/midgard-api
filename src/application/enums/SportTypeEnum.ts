import { EnumValidatorError } from "../erros/ValidatorError";

export enum SportTypesEnum {
    SOCCER = 'SOCCER',
    BASKETBALL = 'BASKETBALL',
    VOLLEYBALL = 'VOLLEYBALL',
    HANDBALL = 'HANDBALL',
    TENNIS = 'TENNIS',
    FOOTBALL = 'FOOTBALL',
    SWIMMING = 'SWIMMING',
    RUNNING = 'RUNNING',
    CYCLING = 'CYCLING',
    GYM = 'GYM',
    OTHER = 'OTHER',
}
export class SportTypeHelper {

    public static fromString(sport: string): SportTypesEnum {

        if (Object.values(SportTypesEnum).includes(sport as SportTypesEnum)) {
            return sport as SportTypesEnum;
        }

        throw new EnumValidatorError(`InvalidSportType "${sport}"`);
    }
}