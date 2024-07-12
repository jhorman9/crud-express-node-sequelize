import { Sequelize } from "sequelize";

process.loadEnvFile();
const db = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    // Si está en produccion que ejecute el SSL para evitar el error, si está en local que esté un objeto vacío.
    dialectOptions: process.env.TYPE === 'local' ? {} : { 
        ssl: { 
          require: true, 
          rejectUnauthorized: false 
        }
      }
});

export default db;