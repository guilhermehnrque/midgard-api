import "reflect-metadata"
import express, { Application, Request, Response } from 'express'
import bearerToken from "./infrastructure/middlewares/BearerToken"

// Common
import AuthRoute from './infrastructure/routes/v1/AuthRoute'
import InvitationRoute from './infrastructure/routes/v1/InvitationRoute'

// Organizer
import GroupRoute from  './infrastructure/routes/v1/organizer/GroupRoute'
import SchedulesRoutes from './infrastructure/routes/v1/organizer/SchedulesRoute'
import ListRoute from './infrastructure/routes/v1/organizer/ListRoute'
import PlayersRoute from './infrastructure/routes/v1/organizer/PlayersRoute'
import GuestRoute from './infrastructure/routes/v1/organizer/GuestRoute'

// Players
import PlayersGroupRoute from './infrastructure/routes/v1/players/PlayersGroupRoute'

import jwt from 'jsonwebtoken';

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/auth', AuthRoute)
app.use('/api/v1/invitations', bearerToken.validate, InvitationRoute)
app.use('/api/v1/organizer/groups', bearerToken.validate, GroupRoute)
app.use('/api/v1/organizer/schedules', bearerToken.validate, SchedulesRoutes)
app.use('/api/v1/organizer/lists', bearerToken.validate, ListRoute)
app.use('/api/v1/organizer/player-list', bearerToken.validate, PlayersRoute);
app.use('/api/v1/organizer/guest-list', bearerToken.validate, GuestRoute);
app.use('/api/v1/players', bearerToken.validate, PlayersGroupRoute)

app.get('/api/v1/protected', bearerToken.validate, (request: Request, response: Response) => {
    response.json({ message: 'You have access to this protected route!', userId: request.userId, userType: request.userType });
})
app.use('/api/v1/decode-token', (request: Request, response: Response) => {
    const bearerToken = request.headers.authorization;
    console.log(bearerToken);
    if (!bearerToken) {
        return response.status(401).json({ message: 'Bearer token is missing' });
    }

    const token = bearerToken.split(' ')[1];
    
    try {
        const decodedToken = jwt.verify(token, process.env.PROJECT_GDB_SECRET_KEY!);
        response.json({ decodedToken });
    } catch (error) {
        response.status(401).json({ message: 'Invalid token' });
    }
});

export default app
