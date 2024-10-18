import { createTerminus } from "@godaddy/terminus";
import sequelize from "../../infrastructure/database";
import { Server } from "http";

const startTime = Date.now();

async function onHealthCheck() {
    try {
        await sequelize.authenticate();

        const uptime = Date.now() - startTime;

        return {
            status: 'ok',
            database: 'connected',
            uptime: `${uptime}ms`,
        };
    } catch (error) {
        return {
            status: 'error',
            database: 'disconnected',
            uptime: `${Date.now() - startTime}ms`,
            error: (error as Error).message,
        };
    }
}

function onSignal() {
    console.log('Servidor está desligando...');
    return Promise.resolve();
}

function healthCheck(server: Server) {
    createTerminus(server, {
        healthChecks: {
            '/health': onHealthCheck,
        },
        onSignal,
    });
}

export default healthCheck;
