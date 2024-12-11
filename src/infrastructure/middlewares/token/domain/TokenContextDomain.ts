import { UserEntity } from "../../../../domain/entity/UserEntity";

export type TokenContextDomain = {
    token?: string;
    userId?: string;
};