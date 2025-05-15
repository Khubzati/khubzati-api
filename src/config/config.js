require('dotenv').config({ path: `${process.cwd()}/.env` });

module.exports = {
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,
  dbUsername: process.env.DB_USERNAME,
  nodeEnv: process.env.NODE_ENV,
};
