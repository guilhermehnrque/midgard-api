import { Router } from "express";
import AuthRouter from "./common/AuthRoute";

const authRoute = new AuthRouter();

const authRoutes = Router();
authRoutes.use('/', authRoute.router);

export default authRoutes