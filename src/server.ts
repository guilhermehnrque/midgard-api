import 'dotenv/config';
import app from './app';
import healthCheck from './infrastructure/routes/health';
import { createServer, Server } from 'http';
import sequelize from './infrastructure/database/index';

class Application {
    private readonly server: Server;
    private readonly port: string | number;

    constructor() {
        this.server = createServer(app);
        this.port = process.env.PORT!;

        healthCheck(this.server);
    }

    private async syncDatabase(): Promise<void> {
        try {
            await sequelize.sync();
        } catch (error) {
            process.exit(1);
        }
    }

    public async start(): Promise<void> {
        await this.syncDatabase();

        this.server.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

const application = new Application();
application.start();
