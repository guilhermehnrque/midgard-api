import { Router } from "express";
import { GroupMembershipRouter } from "./players/GroupMembershipRoutes";

const groupMembershipRoutes = new GroupMembershipRouter();

const playerRouter = Router();

playerRouter.use('/group-membership', groupMembershipRoutes.router);

export default playerRouter;