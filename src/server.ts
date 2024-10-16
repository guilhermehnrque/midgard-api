import 'dotenv/config';
import app from './app';
import healthCheck from './infrastructure/routes/health';
import { createServer } from 'http';
import sequelize from './infrastructure/database/index';

const server = createServer(app);

healthCheck(server);

sequelize.sync().then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
}).catch((error) => {
    console.error('Erro ao sincronizar modelos:', error);
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
