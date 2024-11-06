import { CustomError } from "./CustomError";

export class RemoveGroupMemberError extends CustomError {
    constructor(
        message: string = "Cannot remove user from group", 
        public statusCode: number = 400
    ) {
        super(message);
        this.name = "RemoveGroupMemberError";
    }
}