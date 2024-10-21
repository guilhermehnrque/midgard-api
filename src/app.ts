import "reflect-metadata";
import express, { Application } from 'express';
import BearerToken from "./infrastructure/middlewares/BearerToken";
import OrganizerMiddleware from './infrastructure/middlewares/OrganizerMiddleware';
import PlayerMiddleware from './infrastructure/middlewares/PlayerMiddleware';

import authRoutes from "./infrastructure/routes/AuthRoutes";
import OrganizerRoutes from './infrastructure/routes/OrganizerRoutes';
import PlayerRouter from "./infrastructure/routes/PlayerRoutes";

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes(): void {
        this.app.use('/v1', authRoutes);
        this.app.use('/v1/organizer', [BearerToken.validate, OrganizerMiddleware.validate], OrganizerRoutes);
        this.app.use('/v1/player', [BearerToken.validate, PlayerMiddleware.validate], PlayerRouter);
    }
}

export default new App().app;
