import { Request, Response } from 'express';
import { CustomError } from '../../../application/erros/CustomError';
import { GroupMemberFacade } from '../../../application/facade/organizer/GroupMemberFacade';
import { RegisterGroupMemberRequest } from '../../requests/organizer/groupMember/RegisterGroupMemberRequest';

export class GroupMemberController {
    private readonly groupMemberFacade: GroupMemberFacade;

    constructor() {
        this.groupMemberFacade = new GroupMemberFacade();
    }

    public async addMember(request: Request, response: Response): Promise<Response> {
        try {
            const requestBody: RegisterGroupMemberRequest = request.body;

            await this.groupMemberFacade.addGroupMember(requestBody);

            return response.status(201).json();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async removeMember(request: Request, response: Response): Promise<Response> {
        try {
            const { memberId, groupId } = request.params;

            await this.groupMemberFacade.removeGroupMember(Number(memberId), Number(groupId));

            return response.status(204).json();
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async getMembers(request: Request, response: Response): Promise<Response> {
        try {
            const { groupId } = request.params;

            const members = await this.groupMemberFacade.getGroupMembers(Number(groupId));

            return response.status(200).json(members);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }
}
