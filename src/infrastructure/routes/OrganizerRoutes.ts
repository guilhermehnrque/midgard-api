import { Router } from "express";
import { GroupRouter } from './organizer/GroupRouter';
import { ScheduleRouter } from './organizer/ScheduleRouter';
import { LocalRouter } from './organizer/LocalRouter';
import { ListRouter } from './organizer/ListRouter';
import { ListPlayerRouter } from './organizer/ListPlayerRouter';
import { GroupMemberRouter } from './organizer/GroupMemberRouter';
import { GuestRoutes } from "./common/GuestRoutes";
import { GroupOrganizerRouter } from "./organizer/GroupOrganizerRouter";

const groupRouter = new GroupRouter();
const groupMemberRouter = new GroupMemberRouter();
const scheduleRouter = new ScheduleRouter();
const localRouter = new LocalRouter();
const listRouter = new ListRouter();
const listPlayerRouter = new ListPlayerRouter();
const GuestRoute = new GuestRoutes();
const GroupOrganizerRoute = new GroupOrganizerRouter();

const organizerRouter = Router();

organizerRouter.use('/groups', groupRouter.router);
organizerRouter.use('/schedules', scheduleRouter.router);
organizerRouter.use('/locals', localRouter.router);
organizerRouter.use('/lists', listRouter.router);
organizerRouter.use('/list-players', listPlayerRouter.router);
organizerRouter.use('/group-members', groupMemberRouter.router);
organizerRouter.use('/guests', GuestRoute.router);
organizerRouter.use('/group-organizers', GroupOrganizerRoute.router);

export default organizerRouter;
