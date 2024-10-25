import { Request, Response, NextFunction } from 'express';
import { GroupHandler } from './handlers/GroupHandler';
import { ScheduleHandler } from './handlers/ScheduleHandler';
import { LocalHandler } from './handlers/LocalHandler';
import { ListHandler } from './handlers/ListHandler';

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
        const userId = Number(req.userIdPk);
        let groupId = Number(req.params.groupId);

        if (isNaN(groupId)) {
            groupId = Number(req.body.groupId);
        }

        try {
            await this.groupHandler.handle({ userId, groupId });
            next();
        } catch (error) {
            console.error(error);
            res.status(403).json({ error: 'Access denied' });
        }
    }

    public async scheduleAccess(req: Request, res: Response, next: NextFunction) {
        const userId = Number(req.userIdPk);
        const scheduleId = Number(req.params.scheduleId);

        this.scheduleHandler.setNextHandler(this.groupHandler)

        try {
            await this.scheduleHandler.handle({ userId, scheduleId });
            next();
        } catch (error) {
            console.error(error);
            res.status(403).json({ error: 'Access denied' });
        }
    }

    public async localAccess(req: Request, res: Response, next: NextFunction) {
        const userId = Number(req.userIdPk);
        const localId = Number(req.params.localId);

        this.localHandler.setNextHandler(this.groupHandler)

        try {
            await this.localHandler.handle({ userId, localId });
            next();
        } catch (error) {
            console.error(error);
            res.status(403).json({ error: 'Access denied' });
        }
    }

    public async listAccess(req: Request, res: Response, next: NextFunction) {
        const userId = Number(req.userIdPk);
        let listId = Number(req.params.listId);

        if (!listId || isNaN(listId) || undefined) {
            listId = Number(req.body.listId);
        }

        this.listHandler.setNextHandler(this.groupHandler)

        try {
            await this.listHandler.handle({ userId, listId });
            next();
        } catch (error) {
            console.error(error);
            res.status(403).json({ error: 'Access denied' });
        }
    }
}
