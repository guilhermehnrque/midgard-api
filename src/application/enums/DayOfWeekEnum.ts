import { InternalError } from "../erros/InternalError";

export enum DayOfWeekEnum {
    SUNDAY = "SUNDAY",
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY"
}

export function getDayOfWeekByString(dayOfWeekAsString: string): DayOfWeekEnum | undefined {
    const dayOfWeekMap: { [key: string]: DayOfWeekEnum } = {
        'sunday': DayOfWeekEnum.SUNDAY,
        'monday': DayOfWeekEnum.MONDAY,
        'tuesday': DayOfWeekEnum.TUESDAY,
        'wednesday': DayOfWeekEnum.WEDNESDAY,
        'thursday': DayOfWeekEnum.THURSDAY,
        'friday': DayOfWeekEnum.FRIDAY,
        'saturday': DayOfWeekEnum.SATURDAY
    };

    return dayOfWeekMap[dayOfWeekAsString.toLowerCase()];
}

export class DayOfWeekHelper {

    public static fromString(dayOfWeek: string): DayOfWeekEnum {

        if (Object.values(dayOfWeek).includes(dayOfWeek as DayOfWeekEnum)) {
            return dayOfWeek as DayOfWeekEnum;
        }

        throw new InternalError(`InvalidDayOfWeek "${dayOfWeek}"`);
    }
}
