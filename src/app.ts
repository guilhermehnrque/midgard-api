import "reflect-metadata";
import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml'
import fs from 'fs';
import path from 'path';
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
        this.initializeSwagger();
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

    private initializeSwagger(): void {
        const swaggerFilePath = path.join(__dirname, 'swagger.yml');
        const swaggerFile = fs.readFileSync(swaggerFilePath, 'utf8'); 
        const swaggerDocument = YAML.parse(swaggerFile); 
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 
    }
}

export default new App().app;
