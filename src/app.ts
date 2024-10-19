import "reflect-metadata";
import express, { Application } from 'express';
import BearerToken from "./infrastructure/middlewares/BearerToken";
import OrganizerMiddleware from './infrastructure/middlewares/OrganizerMiddleware';
import PlayerMiddleware from './infrastructure/middlewares/PlayerMiddleware';

// adicionar importação do express-serve-static-core

import authRoutes from "./infrastructure/routes/AuthRoutes";
import OrganizerRoutes from './infrastructure/routes/OrganizerRoutes';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Roteamento
app.use('/v1', authRoutes);
app.use('/v1/organizer', [BearerToken.validate, OrganizerMiddleware.validate], OrganizerRoutes);
app.use('/v1/player', [BearerToken.validate, PlayerMiddleware.validate], OrganizerRoutes);

export default app;
