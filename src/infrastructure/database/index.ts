import { Dialect, Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
  process.env.PROJECT_GDO_DATABASE as string,
  process.env.PROJECT_GDO_DATABASE_USERNAME as string,
  process.env.PROJECT_GDO_DATABASE_PASSWORD as string,
  {
    host: process.env.PROJECT_GDO_DATABASE_HOST,
    port: parseInt(process.env.PROJECT_GDO_DATABASE_PORT as string, 10),
    dialect: process.env.PROJECT_GDO_DATABASE_DIALECT as Dialect,
    timezone: process.env.PROJECT_GDO_DATABASE_TIMEZONE,
  }
);

export default sequelize;
