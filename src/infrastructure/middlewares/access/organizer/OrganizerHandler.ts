import { Request, Response, NextFunction } from 'express';
import { GroupHandler } from './handlers/GroupHandler';
import { ListHandler } from './handlers/ListHandler';
import { LocalHandler } from './handlers/LocalHandler';
import { ScheduleHandler } from './handlers/ScheduleHandler';
import { CustomError } from '../../../../application/erros/CustomError';

export class OrganizerHandler {

    private readonly groupHandler: GroupHandler;
    private readonly scheduleHandler: ScheduleHandler;
    private readonly localHandler: LocalHandler;
    private readonly listHandler: ListHandler;

    constructor() {
        this.groupHandler = new GroupHandler();
        this.scheduleHandler = new ScheduleHandler();
        this.localHandler = new LocalHandler();
        this.listHandler = new ListHandler();
    }

    public async groupAccess(req: Request, res: Response, next: NextFunction) {
        const userIdPkHeader = req.userIdPk;
        const userIdPk = Number(userIdPkHeader);

        let groupId = Number(req.params.groupId);

        if (isNaN(groupId)) {
            groupId = Number(req.body.groupId);
        }

        try {
            await this.groupHandler.handle({ userId: userIdPk, groupId });
            next();
        } catch (error) {
            const err = error as CustomError;
            res.status(err.statusCode).json({ error: err.message });
        }
    }


    public async localAccess(req: Request, res: Response, next: NextFunction) {
        const userIdPkHeader = req.userIdPk;
        const userIdPk = Number(userIdPkHeader);
        const localId = Number(req.params.localId);

        this.localHandler.setNextHandler(this.groupHandler)

        try {
            await this.localHandler.handle({ userId: userIdPk, localId });
            next();
        } catch (error) {
            const err = error as CustomError;
            res.status(err.statusCode).json({ error: err.message });
        }
    }

    public async scheduleAccess(req: Request, res: Response, next: NextFunction) {
        const userIdPkHeader = req.userIdPk;
        const userIdPk = Number(userIdPkHeader);
        const scheduleId = Number(req.params.scheduleId);

        this.scheduleHandler.setNextHandler(this.groupHandler)

        try {
            await this.scheduleHandler.handle({ userId: userIdPk, scheduleId });
            next();
        } catch (error) {
            const err = error as CustomError;
            res.status(err.statusCode).json({ error: err.message });
        }
    }

    public async listAccess(req: Request, res: Response, next: NextFunction) {
        const userIdPkHeader = req.userIdPk;
        const userIdPk = Number(userIdPkHeader);
        const listId = this.checkListAccessParams(req);

        this.listHandler.setNextHandler(this.groupHandler)

        try {
            await this.listHandler.handle({ userId: userIdPk, listId });
            next();
        } catch (error) {
            const err = error as CustomError;
            res.status(err.statusCode).json({ error: err.message });
        }
    }

    private checkListAccessParams(req: Request) {
        let listId = Number(req.params.listId);

        if (!listId || isNaN(listId) || undefined) {
            listId = Number(req.body.listId);
        }

        return listId;
    }

}
