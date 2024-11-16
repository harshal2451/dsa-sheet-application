import { Sequelize } from 'sequelize';
import { getEnv } from '../env';
const sequelize = new Sequelize(getEnv().DB_NAME, getEnv().DB_USER, getEnv().DB_PWD, {
  host: 'localhost',
  port: 3307,
  dialect: 'mysql', // Change this if using a different SQL dialect
});

export default sequelize;
