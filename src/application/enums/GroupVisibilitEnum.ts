import { InternalError } from "../erros/InternalError";

export enum GroupVisibilityEnum {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}

export function allowedGroupVisibility(): GroupVisibilityEnum[] {
    return [GroupVisibilityEnum.PUBLIC, GroupVisibilityEnum.PRIVATE];
}

export function getGroupVisibility(visibility: string): GroupVisibilityEnum {
    return GroupVisibilityEnum[visibility.toUpperCase() as keyof typeof GroupVisibilityEnum]
}

export class GroupVisibilityHelper {

    public static fromString(visibility: string): GroupVisibilityEnum {

        if (Object.values(GroupVisibilityEnum).includes(visibility as GroupVisibilityEnum)) {
            return visibility as GroupVisibilityEnum;
        }

        throw new InternalError(`Invalid Group Visibilit "${visibility}"`);
    }
}