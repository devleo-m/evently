const { Sequelize } = require('sequelize');
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: Number(process.env.POSTGRES_PORT),
});

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Banco de dados conectado com sucesso!');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
};

export default sequelize;