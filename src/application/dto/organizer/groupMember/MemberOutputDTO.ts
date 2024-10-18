export class MemberOutputDTO {
    public id: number
    public memberName: string

    constructor(id: number, memberName: string) {
        this.id = id;
        this.memberName = memberName;
    }
}