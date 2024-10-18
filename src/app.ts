import "reflect-metadata";
import express, { Application } from 'express';
import BearerToken from "./infrastructure/middlewares/BearerToken";

import authRoutes from "./infrastructure/routes/AuthRoutes";
import OrganizerRoutes from './infrastructure/routes/OrganizerRoutes';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Roteamento
app.use('/v1', authRoutes);
app.use('/v1/organizer', BearerToken.validate, OrganizerRoutes);

export default app;
