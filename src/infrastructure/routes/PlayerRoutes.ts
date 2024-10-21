import { Router } from "express";
import { GroupMembershipRouter } from "./players/GroupMembershipRoutes";
import { ListMembershipRoutes } from "./players/ListMembershipRoutes";

const groupMembershipRoutes = new GroupMembershipRouter();
const listMembershipRoutes = new ListMembershipRoutes();

const playerRouter = Router();

playerRouter.use('/group-membership', groupMembershipRoutes.router);
playerRouter.use('/list-membership', listMembershipRoutes.router);

export default playerRouter;